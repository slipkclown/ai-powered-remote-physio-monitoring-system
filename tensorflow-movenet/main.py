import cv2

from pose.detector import MoveNetDetector
from pose.drawing import PoseDrawer

from exercise.analyzer import PoseAnalyzer
from exercise.filter import AngleFilter


def main():

    # Load detector
    detector = MoveNetDetector()

    # Drawer
    drawer = PoseDrawer()

    # Analyzer
    analyzer = PoseAnalyzer()

    # Angle filter
    angle_filter = AngleFilter(window_size=5)

    # Webcam
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("❌ Cannot open webcam")
        return

    print("📷 Webcam started!")

    while True:

        ret, frame = cap.read()

        if not ret:
            break

        # Detect pose
        keypoints = detector.detect(frame)

        # Calculate joint angles
        angles = analyzer.get_joint_angles(keypoints)

        # Smooth every angle
        for name in angles:
            angles[name] = angle_filter.smooth(
                name,
                angles[name]
            )

        # Print angles
        print(
            f"LE: {angles['left_elbow']:.1f}° | "
            f"RE: {angles['right_elbow']:.1f}° | "
            f"LK: {angles['left_knee']:.1f}° | "
            f"RK: {angles['right_knee']:.1f}°"
        )

        # Draw pose
        frame = drawer.draw_keypoints(frame, keypoints)

        cv2.imshow(
            "MoveNet Pose Detection",
            frame
        )

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()