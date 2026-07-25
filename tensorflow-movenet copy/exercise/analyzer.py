import numpy as np

from exercise.angles import calculate_angle
from pose.keypoints import *


class PoseAnalyzer:
    """
    Converts MoveNet keypoints into joint angles.
    """

    def __init__(self):
        self.confidence_threshold = 0.30

    def _xy(self, point):
        """
        Convert MoveNet (y, x, confidence)
        into (x, y).
        """
        return [point[1], point[0]]

    def _valid(self, *points):
        """
        Check whether all supplied keypoints have
        sufficient confidence.
        """
        return all(
            point[2] >= self.confidence_threshold
            for point in points
        )

    def _angle(self, kp, a, b, c):
        """
        Safely calculate a joint angle.

        Returns 180° if any required keypoint
        has insufficient confidence.
        """

        point_a = kp[a]
        point_b = kp[b]
        point_c = kp[c]

        if not self._valid(point_a, point_b, point_c):
            return 180.0

        return calculate_angle(
            self._xy(point_a),
            self._xy(point_b),
            self._xy(point_c)
        )

    def get_joint_angles(self, keypoints) -> dict:
        """
        Convert MoveNet keypoints into body joint angles.

        Parameters
        ----------
        keypoints : numpy.ndarray
            MoveNet output with shape (1, 1, 17, 3)

        Returns
        -------
        dict
            Dictionary containing body joint angles.
        """

        kp = keypoints[0][0]

        angles = {

            # ==========================
            # Arms
            # ==========================

            "left_elbow": self._angle(
                kp,
                LEFT_SHOULDER,
                LEFT_ELBOW,
                LEFT_WRIST
            ),

            "right_elbow": self._angle(
                kp,
                RIGHT_SHOULDER,
                RIGHT_ELBOW,
                RIGHT_WRIST
            ),

            # ==========================
            # Legs
            # ==========================

            "left_knee": self._angle(
                kp,
                LEFT_HIP,
                LEFT_KNEE,
                LEFT_ANKLE
            ),

            "right_knee": self._angle(
                kp,
                RIGHT_HIP,
                RIGHT_KNEE,
                RIGHT_ANKLE
            ),

            # ==========================
            # Hips
            # ==========================

            "left_hip": self._angle(
                kp,
                LEFT_SHOULDER,
                LEFT_HIP,
                LEFT_KNEE
            ),

            "right_hip": self._angle(
                kp,
                RIGHT_SHOULDER,
                RIGHT_HIP,
                RIGHT_KNEE
            ),

            # ==========================
            # Shoulders
            # ==========================

            "left_shoulder": self._angle(
                kp,
                LEFT_ELBOW,
                LEFT_SHOULDER,
                LEFT_HIP
            ),

            "right_shoulder": self._angle(
                kp,
                RIGHT_ELBOW,
                RIGHT_SHOULDER,
                RIGHT_HIP
            )

        }

        return angles