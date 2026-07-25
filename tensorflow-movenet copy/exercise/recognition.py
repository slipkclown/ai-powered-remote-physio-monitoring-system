class ExerciseRecognizer:
    """
    Recognizes squat movement phases using
    knee flexion angle.

    Internal knee angle:
        180° = Standing

    Knee flexion:
        0° = Standing
        90° = Half Squat
        >100° = Deep Squat
    """

    def __init__(self):

        self.minimum_valid_angle = 30
        self.maximum_valid_angle = 180

    def _is_valid_angle(self, angle):

        if angle is None:
            return False

        return (
            self.minimum_valid_angle
            <= angle
            <= self.maximum_valid_angle
        )

    def recognize(self, angles):

        left = angles.get("left_knee")
        right = angles.get("right_knee")

        if (
            not self._is_valid_angle(left)
            or not self._is_valid_angle(right)
        ):
            return "Not Recognized"

        average_internal = (left + right) / 2

        # Convert to clinical knee flexion
        flexion = 180 - average_internal

        if flexion <= 30:
            return "Standing"

        elif flexion <= 60:
            return "Mini Squat"

        elif flexion <= 89:
            return "Approaching Half Squat"

        elif flexion <= 100:
            return "Half Squat"

        else:
            return "Deep Squat"