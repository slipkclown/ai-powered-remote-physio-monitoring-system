import cv2

from pose.keypoints import KEYPOINT_NAMES
from pose.skeleton import SKELETON_CONNECTIONS


class PoseDrawer:

    def draw_keypoints(self, frame, keypoints):
        """
        Draw all detected body keypoints and skeleton.
        """

        height, width, _ = frame.shape

        # -----------------------------
        # Draw Skeleton
        # -----------------------------
        for start, end in SKELETON_CONNECTIONS:

            start_point = keypoints[0][0][start]
            end_point = keypoints[0][0][end]

            # Confidence values
            start_conf = start_point[2]
            end_conf = end_point[2]

            # Ignore uncertain detections
            if start_conf > 0.3 and end_conf > 0.3:

                start_x = int(start_point[1] * width)
                start_y = int(start_point[0] * height)

                end_x = int(end_point[1] * width)
                end_y = int(end_point[0] * height)

                cv2.line(
                    frame,
                    (start_x, start_y),
                    (end_x, end_y),
                    (255, 0, 0),
                    2
                )

        # -----------------------------
        # Draw Keypoints
        # -----------------------------
        for index in KEYPOINT_NAMES:

            keypoint = keypoints[0][0][index]

            y = int(keypoint[0] * height)
            x = int(keypoint[1] * width)
            confidence = keypoint[2]

            if confidence > 0.3:

                cv2.circle(
                    frame,
                    (x, y),
                    6,
                    (0, 255, 0),
                    -1
                )

        return frame