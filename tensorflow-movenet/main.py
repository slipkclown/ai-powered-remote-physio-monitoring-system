import cv2

from pose.detector import MoveNetDetector
from pose.drawing import PoseDrawer

from exercise.analyzer import PoseAnalyzer
from exercise.filter import AngleFilter
from exercise.recognition import ExerciseRecognizer
from exercise.counter import ExerciseCounter
from exercise.scoring import MovementScorer
from exercise.rep_analysis import RepAnalyzer
from exercise.report import ReportGenerator
from exercise.session import ExerciseSession


def main():

    # =====================================================
    # Physiotherapy Session Setup
    # =====================================================

    print("==========================================")
    print(" AI REMOTE PHYSIOTHERAPY MONITORING SYSTEM ")
    print("==========================================\n")

    exercise_type = input("Exercise Type: ")

    total_sets = int(input("Number of Sets: "))

    reps_per_set = int(input("Repetitions per Set: "))

    session = ExerciseSession(
        exercise_type=exercise_type,
        total_sets=total_sets,
        reps_per_set=reps_per_set
    )

    print("\n✅ Session Created Successfully!")
    session.display()

    # =====================================================
    # Initialize Modules
    # =====================================================

    detector = MoveNetDetector()
    drawer = PoseDrawer()
    analyzer = PoseAnalyzer()

    angle_filter = AngleFilter(window_size=5)

    recognizer = ExerciseRecognizer()
    counter = ExerciseCounter()

    scorer = MovementScorer()
    rep_analyzer = RepAnalyzer()
    reporter = ReportGenerator()

    last_reported_rep = 0

    # =====================================================
    # Webcam
    # =====================================================

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("❌ Cannot open webcam.")
        return

    print("\n📷 Webcam Started")
    print("Press 'Q' to quit.\n")

    while True:

        success, frame = cap.read()

        if not success:
            print("\n❌ Failed to read webcam frame.")
            break

        # ----------------------------------------
        # Pose Detection
        # ----------------------------------------

        keypoints = detector.detect(frame)

        # ----------------------------------------
        # Joint Angle Analysis
        # ----------------------------------------

        angles = analyzer.get_joint_angles(keypoints)

        # ----------------------------------------
        # Smooth Angles
        # ----------------------------------------

        for joint in angles:
            angles[joint] = angle_filter.smooth(
                joint,
                angles[joint]
            )

        # ----------------------------------------
        # Exercise Recognition
        # ----------------------------------------

        exercise = recognizer.recognize(angles)

        # ----------------------------------------
        # Rep Counter
        # ----------------------------------------

        reps = counter.update(exercise)

        # ----------------------------------------
        # Movement Scores
        # ----------------------------------------

        scores = scorer.overall_score(angles)

        rom_result = scorer.score_rom(
            angles,
            exercise
        )

        _, stability_label = scorer.score_stability(
            angles,
            exercise
        )

        _, speed_label, elapsed_time = scorer.score_speed(
            exercise
        )

        # ----------------------------------------
        # Generate Report Once Per Rep
        # ----------------------------------------

        if reps > last_reported_rep:

            session.record_rep()

            analysis = rep_analyzer.analyze(
                exercise=exercise,
                reps=reps,
                scores=scores,
                rom_result=rom_result,
                stability_label=stability_label,
                speed_label=speed_label,
                elapsed_time=elapsed_time,
            )

            report = reporter.generate(
                analysis
            )

            print("\n")
            print(report)

            session.display()

            last_reported_rep = reps

            # ------------------------------------
            # Session Finished
            # ------------------------------------

            if session.is_complete():

                print("🎉 Physiotherapy Session Completed!")

                print("\n==========================================")
                print("SESSION SUMMARY")
                print("==========================================")

                summary = session.summary()

                print(f"Exercise           : {summary['exercise']}")
                print(f"Sets               : {summary['total_sets']}")
                print(f"Completed Reps     : {summary['completed_reps']}")
                print(f"Progress           : {summary['progress']}%")

                print("\nExcellent work! Session finished successfully.")

                break

        # ----------------------------------------
        # Live Status
        # ----------------------------------------

        print(
            f"\r"
            f"Exercise: {exercise:<10}"
            f"| Set: {session.current_set}/{session.total_sets} "
            f"| Rep: {session.current_rep}/{session.reps_per_set}",
            end=""
        )

        # ----------------------------------------
        # Draw Skeleton
        # ----------------------------------------

        frame = drawer.draw_keypoints(
            frame,
            keypoints
        )

        # ----------------------------------------
        # Display Webcam
        # ----------------------------------------

        cv2.imshow(
            "AI-Powered Remote Physiotherapy Monitoring",
            frame
        )

        # ----------------------------------------
        # Quit
        # ----------------------------------------

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()