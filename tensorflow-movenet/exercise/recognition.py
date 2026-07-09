class ExerciseRecognizer:
    """
    Recognizes exercises based on joint angles.
    """

    def recognize(self, angles):
        """
        Determine the current exercise state.

        Parameters
        ----------
        angles : dict
            Dictionary of joint angles.

        Returns
        -------
        str
            Exercise state.
        """

        left_knee = angles["left_knee"]
        right_knee = angles["right_knee"]

        # Standing
        if left_knee > 160 and right_knee > 160:
            return "Standing"

        # Squat
        elif left_knee < 100 and right_knee < 100:
            return "Squatting"

        # Between positions
        else:
            return "Moving"