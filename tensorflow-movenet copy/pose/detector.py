class ExerciseRecognizer:
    """
    Recognizes squat exercise states based on knee joint angles.
    """

    def recognize(self, angles):
        """
        Determine the current exercise state.

        Parameters
        ----------
        angles : dict
            Dictionary containing knee joint angles.

        Returns
        -------
        str
            "Standing", "Moving", "Squatting",
            or "Not Recognized"
        """

        left_knee = angles["left_knee"]
        right_knee = angles["right_knee"]

        average_knee = (left_knee + right_knee) / 2

        # ---------------------------------
        # Validate detected angles
        # ---------------------------------

        if (
            left_knee < 30 or left_knee > 180 or
            right_knee < 30 or right_knee > 180
        ):
            return "Not Recognized"

        # ---------------------------------
        # Standing
        # ---------------------------------

        if average_knee >= 165:
            return "Standing"

        # ---------------------------------
        # Squatting
        # ---------------------------------

        elif average_knee <= 105:
            return "Squatting"

        # ---------------------------------
        # Moving
        # ---------------------------------

        elif 105 < average_knee < 165:
            return "Moving"

        # ---------------------------------
        # Unknown posture
        # ---------------------------------

        return "Not Recognized"