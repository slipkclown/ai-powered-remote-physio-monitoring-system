from datetime import datetime


class ReportGenerator:
    """
    Generates a physiotherapy report
    for one completed repetition.
    """

    def _format_angle(self, angle):
        """
        Format knee flexion angles.
        """

        if angle is None:
            return "Tracking..."

        return f"{angle:.1f}°"

    def generate(self, analysis):
        """
        Generate a formatted repetition report.
        """

        left_flexion = self._format_angle(
            analysis["left_knee_flexion"]
        )

        right_flexion = self._format_angle(
            analysis["right_knee_flexion"]
        )

        average_flexion = self._format_angle(
            analysis["average_knee_flexion"]
        )

        timestamp = datetime.now().strftime(
            "%d/%m/%Y %H:%M:%S"
        )

        report = f"""
============================================================
            AI REMOTE PHYSIOTHERAPY REPORT
============================================================

Date & Time          : {timestamp}

Exercise             : Squat

Repetition           : {analysis['reps']}

Movement Achieved    : {analysis['movement_classification']}

------------------------------------------------------------

MOVEMENT QUALITY

Depth                : {analysis['depth']}

Symmetry             : {analysis['symmetry']}

Range of Motion      : {analysis['rom']}

Stability            : {analysis['stability']}

Movement Speed       : {analysis['speed']}

------------------------------------------------------------

KNEE FLEXION

Left Knee            : {left_flexion}

Right Knee           : {right_flexion}

Average Flexion      : {average_flexion}

------------------------------------------------------------

OVERALL PERFORMANCE

Overall Score        : {analysis['overall_score']} / 100

Assessment

{analysis['assessment']}

------------------------------------------------------------

RECOMMENDATIONS

"""

        recommendations = []

        movement = analysis["movement_classification"]

        # ==========================================
        # Movement Feedback
        # ==========================================

        if movement == "Standing":

            recommendations.append(
                "• Increase knee flexion to begin the squat."
            )

        elif movement == "Mini Squat":

            recommendations.append(
                "• Increase squat depth for better therapeutic benefit."
            )

        elif movement == "Approaching Half Squat":

            recommendations.append(
                "• Good progress. Continue lowering while maintaining posture."
            )

        elif movement == "Half Squat":

            recommendations.append(
                "• Good squat depth achieved. Maintain stability throughout the movement."
            )

        elif movement == "Deep Squat":

            recommendations.append(
                "• Excellent squat depth achieved with full range of motion."
            )

        # ==========================================
        # Symmetry
        # ==========================================

        if analysis["symmetry"] != "Excellent":

            recommendations.append(
                "• Keep your weight evenly distributed between both legs."
            )

        # ==========================================
        # Stability
        # ==========================================

        if analysis["stability"] not in (
            "Excellent",
            "Good"
        ):

            recommendations.append(
                "• Focus on smoother and more controlled movement."
            )

        # ==========================================
        # Speed
        # ==========================================

        if (
            "Needs Improvement" in analysis["speed"]
            or "Fair" in analysis["speed"]
        ):

            recommendations.append(
                "• Perform the exercise at a slower and more controlled pace."
            )

        # ==========================================
        # Excellent Performance
        # ==========================================

        if analysis["overall_score"] >= 95:

            recommendations = [

                "• Excellent overall movement quality.",

                "• Maintain your current squat technique.",

                "• Continue performing controlled repetitions."

            ]

        # ==========================================
        # Default Recommendation
        # ==========================================

        if not recommendations:

            recommendations.append(
                "• Continue performing the exercise using proper technique."
            )

        for recommendation in recommendations:

            report += recommendation + "\n"

        report += """

============================================================
"""

        return report