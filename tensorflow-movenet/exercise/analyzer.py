from exercise.angles import calculate_angle

from pose.keypoints import *


class PoseAnalyzer:
    """
    Converts MoveNet keypoints into joint angles.
    """

    def _xy(self, point):
        """
        Convert MoveNet (y, x, confidence)
        into (x, y)
        """
        return [point[1], point[0]]

    def get_joint_angles(self, keypoints):

        kp = keypoints[0][0]

        angles = {

            # Arms
            "left_elbow": calculate_angle(
                self._xy(kp[LEFT_SHOULDER]),
                self._xy(kp[LEFT_ELBOW]),
                self._xy(kp[LEFT_WRIST])
            ),

            "right_elbow": calculate_angle(
                self._xy(kp[RIGHT_SHOULDER]),
                self._xy(kp[RIGHT_ELBOW]),
                self._xy(kp[RIGHT_WRIST])
            ),

            # Legs
            "left_knee": calculate_angle(
                self._xy(kp[LEFT_HIP]),
                self._xy(kp[LEFT_KNEE]),
                self._xy(kp[LEFT_ANKLE])
            ),

            "right_knee": calculate_angle(
                self._xy(kp[RIGHT_HIP]),
                self._xy(kp[RIGHT_KNEE]),
                self._xy(kp[RIGHT_ANKLE])
            ),

            # Hips
            "left_hip": calculate_angle(
                self._xy(kp[LEFT_SHOULDER]),
                self._xy(kp[LEFT_HIP]),
                self._xy(kp[LEFT_KNEE])
            ),

            "right_hip": calculate_angle(
                self._xy(kp[RIGHT_SHOULDER]),
                self._xy(kp[RIGHT_HIP]),
                self._xy(kp[RIGHT_KNEE])
            ),

            # Shoulders
            "left_shoulder": calculate_angle(
                self._xy(kp[LEFT_ELBOW]),
                self._xy(kp[LEFT_SHOULDER]),
                self._xy(kp[LEFT_HIP])
            ),

            "right_shoulder": calculate_angle(
                self._xy(kp[RIGHT_ELBOW]),
                self._xy(kp[RIGHT_SHOULDER]),
                self._xy(kp[RIGHT_HIP])
            )

        }

        return angles