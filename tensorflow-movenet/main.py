import cv2

from pose.detector import MoveNetDetector
from pose.drawing import PoseDrawer

from exercise.analyzer import PoseAnalyzer
from exercise.filter import AngleFilter
from exercise.recognition import ExerciseRecognizer
from exercise.counter import ExerciseCounter


def main():
    # Initialize detector
    detector = MoveNetDetector()

    # Initialize drawer
    drawer = PoseDrawer()

    # Initialize analyzer
    analyzer = PoseAnalyzer()

    # Initialize angle filter
    angle_filter = AngleFilter(window_size=5)

    # Initialize exercise recognizer
    recognizer = ExerciseRecognizer()

    # Initialize repetition counter
    counter = ExerciseCounter()

    # Open webcam
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("❌ Cannot open webcam")
        return

    print("📷 Webcam started!")

    while True:

        ret, frame = cap.read()

        if not ret:
            print("❌ Failed to read frame")
            break

        # Detect pose
        keypoints = detector.detect(frame)

        # Calculate joint angles
        angles = analyzer.get_joint_angles(keypoints)

        # Smooth all angles
        for name in angles:
            angles[name] = angle_filter.smooth(name, angles[name])

        # Recognize exercise state
        exercise = recognizer.recognize(angles)

        # Update repetition counter
        reps = counter.update(exercise)

        # Print status
        print(
            f"{exercise} | "
            f"Reps: {reps} | "
            f"LK: {angles['left_knee']:.1f}° | "
            f"RK: {angles['right_knee']:.1f}°"
        )

        # Draw pose
        frame = drawer.draw_keypoints(frame, keypoints)

        # Display webcam
        cv2.imshow("AI Physiotherapy - MoveNet", frame)

        # Press Q to quit
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()