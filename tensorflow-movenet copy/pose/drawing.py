import cv2
import numpy as np

from pose.keypoints import KEYPOINT_NAMES
from pose.skeleton import SKELETON_CONNECTIONS


class PoseDrawer:
    """
    Draws the detected human pose skeleton and keypoints.
    """

    def __init__(self):
        self.confidence_threshold = 0.30

        # Drawing settings
        self.keypoint_radius = 6
        self.keypoint_color = (0, 255, 0)      # Green
        self.skeleton_color = (255, 0, 0)      # Blue
        self.line_thickness = 2

    def draw_keypoints(
        self,
        frame: np.ndarray,
        keypoints: np.ndarray
    ) -> np.ndarray:
        """
        Draw detected body keypoints and skeleton.

        Parameters
        ----------
        frame : numpy.ndarray
            OpenCV image.

        keypoints : numpy.ndarray
            MoveNet output with shape (1, 1, 17, 3).

        Returns
        -------
        numpy.ndarray
            Frame with skeleton overlay.
        """

        height, width, _ = frame.shape

        points = keypoints[0][0]

        # ==========================================
        # Draw Skeleton
        # ==========================================

        for start, end in SKELETON_CONNECTIONS:

            start_point = points[start]
            end_point = points[end]

            if (
                start_point[2] < self.confidence_threshold
                or end_point[2] < self.confidence_threshold
            ):
                continue

            start_x = int(start_point[1] * width)
            start_y = int(start_point[0] * height)

            end_x = int(end_point[1] * width)
            end_y = int(end_point[0] * height)

            cv2.line(
                frame,
                (start_x, start_y),
                (end_x, end_y),
                self.skeleton_color,
                self.line_thickness
            )

        # ==========================================
        # Draw Keypoints
        # ==========================================

        for index in KEYPOINT_NAMES:

            point = points[index]

            confidence = point[2]

            if confidence < self.confidence_threshold:
                continue

            x = int(point[1] * width)
            y = int(point[0] * height)

            cv2.circle(
                frame,
                (x, y),
                self.keypoint_radius,
                self.keypoint_color,
                -1
            )

        return frame