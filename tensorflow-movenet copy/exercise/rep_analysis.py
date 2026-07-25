class RepAnalyzer:
    """
    Coordinates the analysis of a single completed repetition.

    This class combines movement quality, range of motion,
    stability, speed, and overall assessment into one
    structured result for report generation.
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
        Analyse one completed repetition.

        Parameters
        ----------
        exercise : str
            Current exercise state.

        reps : int
            Completed repetition count.

        scores : dict
            Output from MovementScorer.overall_score().

        rom_result : dict or None
            Output from MovementScorer.score_rom().

        stability_label : str
            Stability assessment.

        speed_label : str
            Speed assessment.

        elapsed_time : float or None
            Repetition duration.

        Returns
        -------
        dict
            Complete repetition analysis.
        """

        # ==========================================
        # Range of Motion
        # ==========================================

        if rom_result is None:

            rom = {
                "label": "Tracking...",
                "left_knee": None,
                "right_knee": None,
                "average_knee": None,
                "left_flexion": None,
                "right_flexion": None,
                "average_flexion": None,
                "movement_classification": "Tracking..."
            }

        else:

            rom = rom_result

        # ==========================================
        # Speed
        # ==========================================

        if elapsed_time is None:

            speed = speed_label

        else:

            speed = f"{speed_label} ({elapsed_time:.2f} s)"

        # ==========================================
        # Final Analysis
        # ==========================================

        return {

            # Session Information
            "exercise": exercise,
            "reps": reps,

            # Quality Scores
            "depth": scores["depth_label"],
            "symmetry": scores["symmetry_label"],
            "rom": rom["label"],
            "stability": stability_label,
            "speed": speed,

            # Internal Knee Angles
            "left_knee_angle": rom["left_knee"],
            "right_knee_angle": rom["right_knee"],
            "average_knee_angle": rom["average_knee"],

            # Clinical Knee Flexion
            "left_knee_flexion": rom["left_flexion"],
            "right_knee_flexion": rom["right_flexion"],
            "average_knee_flexion": rom["average_flexion"],

            # Clinical Interpretation
            "movement_classification":
                rom["movement_classification"],

            # Overall Score
            "overall_score": scores["overall_score"],
            "assessment": scores["assessment"]

        }