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

            left_flexion = None
            right_flexion = None
            average_flexion = None

            movement_classification = "Tracking..."

        else:

            rom_label = rom_result["label"]

            # Internal Knee Angles
            left_knee = rom_result["left_knee"]
            right_knee = rom_result["right_knee"]
            average_knee = rom_result["average_knee"]

            # Knee Flexion
            left_flexion = rom_result["left_flexion"]
            right_flexion = rom_result["right_flexion"]
            average_flexion = rom_result["average_flexion"]

            # Clinical Interpretation
            movement_classification = rom_result["movement_classification"]

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

            # Internal Knee Angles
            "left_knee_angle": left_knee,
            "right_knee_angle": right_knee,
            "average_knee_angle": average_knee,

            # Knee Flexion (Clinical)
            "left_knee_flexion": left_flexion,
            "right_knee_flexion": right_flexion,
            "average_knee_flexion": average_flexion,

            # Movement Classification
            "movement_classification": movement_classification,

            "stability": stability_label,

            "speed": speed,

            "overall_score": scores["overall_score"],

            "assessment": scores["assessment"]

        }