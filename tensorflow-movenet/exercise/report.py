class ReportGenerator:
    """
    Generates a physiotherapy movement report
    from a completed repetition analysis.
    """

    def generate(self, analysis):
        """
        Generate a formatted physiotherapy report.
        """

        # Handle None values gracefully
        left_flexion = (
            f"{analysis['left_knee_flexion']:.1f}°"
            if analysis["left_knee_flexion"] is not None
            else "Tracking..."
        )

        right_flexion = (
            f"{analysis['right_knee_flexion']:.1f}°"
            if analysis["right_knee_flexion"] is not None
            else "Tracking..."
        )

        average_flexion = (
            f"{analysis['average_knee_flexion']:.1f}°"
            if analysis["average_knee_flexion"] is not None
            else "Tracking..."
        )

        report = f"""
==================================================

            AI PHYSIOTHERAPY REPORT

==================================================

Exercise                  : {analysis['exercise']}

Completed Reps            : {analysis['reps']}

--------------------------------------------------

Movement Quality

Depth                     : {analysis['depth']}

Movement Classification   : {analysis['movement_classification']}

Left Knee Flexion         : {left_flexion}

Right Knee Flexion        : {right_flexion}

Average Knee Flexion      : {average_flexion}

Range of Motion           : {analysis['rom']}

Stability                 : {analysis['stability']}

Movement Speed            : {analysis['speed']}

--------------------------------------------------

Overall Score             : {analysis['overall_score']} / 100

Assessment

{analysis['assessment']}

--------------------------------------------------

Recommendation
"""

        recommendations = []

        # ---------------------------------
        # Movement Classification
        # ---------------------------------

        classification = analysis["movement_classification"]

        if classification == "Standing / Mini Squat":
            recommendations.append(
                "- Increase knee flexion gradually to improve squat depth."
            )

        elif classification == "Semi Squat":
            recommendations.append(
                "- Try lowering your hips slightly while maintaining good posture."
            )

        elif classification == "Approaching Half Squat":
            recommendations.append(
                "- Good progress. Aim for a half squat if comfortable."
            )

        elif classification == "Half / Parallel Squat":
            recommendations.append(
                "- Good squat depth achieved. Continue maintaining proper control."
            )

        elif classification == "Deep Squat":
            recommendations.append(
                "- Excellent squat depth achieved. Maintain stability and proper technique."
            )

        # ---------------------------------
        # Symmetry
        # ---------------------------------

        if analysis["symmetry"] != "Excellent":
            recommendations.append(
                "- Keep your weight evenly distributed between both legs."
            )

        # ---------------------------------
        # Stability
        # ---------------------------------

        if analysis["stability"] not in ["Excellent", "Good"]:
            recommendations.append(
                "- Focus on smoother and more controlled movement."
            )

        # ---------------------------------
        # Speed
        # ---------------------------------

        if "Excellent" not in analysis["speed"]:
            recommendations.append(
                "- Maintain a slow and controlled movement speed."
            )

        # ---------------------------------
        # Overall Performance
        # ---------------------------------

        if (
            analysis["depth"] == "Excellent"
            and analysis["symmetry"] == "Excellent"
            and analysis["stability"] in ["Excellent", "Good"]
            and "Excellent" in analysis["speed"]
            and analysis["movement_classification"] in [
                "Half / Parallel Squat",
                "Deep Squat"
            ]
        ):
            recommendations = [
                "- Excellent movement quality. Keep up the great work!"
            ]

        for recommendation in recommendations:
            report += recommendation + "\n"

        report += "\n==================================================\n"

        return report