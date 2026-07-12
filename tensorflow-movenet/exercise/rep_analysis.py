class RepAnalyzer:
    """
    Coordinates movement analysis for one completed repetition.
    """

    def analyze(
        self,
        exercise,
        reps,
        scores,
        rom_result,
        stability_label,
        speed_label,
        elapsed_time,
    ):
        """
        Package all repetition data into a single dictionary.
        """

        # ---------------------------------
        # ROM Result
        # ---------------------------------

        if rom_result is None:

            rom_label = "Tracking..."

            left_knee = None
            right_knee = None
            average_knee = None

        else:

            rom_label = rom_result["label"]

            left_knee = rom_result["left_knee"]
            right_knee = rom_result["right_knee"]
            average_knee = rom_result["average_knee"]

        # ---------------------------------
        # Speed Result
        # ---------------------------------

        if elapsed_time is None:
            speed = speed_label
        else:
            speed = f"{speed_label} ({elapsed_time:.2f} s)"

        # ---------------------------------
        # Final Analysis
        # ---------------------------------

        return {

            "exercise": exercise,

            "reps": reps,

            "depth": scores["depth_label"],

            "symmetry": scores["symmetry_label"],

            "rom": rom_label,

            "left_knee_angle": left_knee,

            "right_knee_angle": right_knee,

            "average_knee_angle": average_knee,

            "stability": stability_label,

            "speed": speed,

            "overall_score": scores["overall_score"],

            "assessment": scores["assessment"]

        }