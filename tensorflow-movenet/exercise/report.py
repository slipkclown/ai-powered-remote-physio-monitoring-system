class ReportGenerator:
    """
    Generates a physiotherapy movement report
    from a completed repetition analysis.
    """

    def generate(self, analysis):
        """
        Generate a formatted physiotherapy report.
        """

        report = f"""
==================================================

        AI PHYSIOTHERAPY REPORT

==================================================

Exercise           : {analysis['exercise']}

Completed Reps     : {analysis['reps']}

--------------------------------------------------

Movement Quality

Depth              : {analysis['depth']}

Left Knee Flexion    : {analysis['left_knee_angle']:.1f}°

Right Knee Flexion   : {analysis['right_knee_angle']:.1f}°

Average Knee Flexion : {analysis['average_knee_angle']:.1f}°

Range of Motion    : {analysis['rom']}

Stability          : {analysis['stability']}

Movement Speed     : {analysis['speed']}

--------------------------------------------------

Overall Score      : {analysis['overall_score']} / 100

Assessment

{analysis['assessment']}

--------------------------------------------------

Recommendation
"""

        recommendations = []

        # Depth
        if analysis["depth"] != "Excellent":
            recommendations.append(
                "- Try to squat slightly deeper while maintaining good form."
            )

        # Symmetry
        if analysis["symmetry"] != "Excellent":
            recommendations.append(
                "- Keep your weight evenly distributed between both legs."
            )

        # Stability
        if analysis["stability"] not in ["Excellent", "Good"]:
            recommendations.append(
                "- Focus on smoother and more controlled movement."
            )

        # Speed
        if "Excellent" not in analysis["speed"]:
            recommendations.append(
                "- Maintain a slow and controlled movement speed."
            )

        # ROM
        if analysis["rom"] != "Excellent":
            recommendations.append(
                "- Increase your squat depth gradually to improve range of motion."
            )

        # Excellent performance
        if not recommendations:
            recommendations.append(
                "- Excellent movement quality. Keep up the great work!"
            )

        for recommendation in recommendations:
            report += recommendation + "\n"

        report += "\n==================================================\n"

        return report