import time
import numpy as np


class MovementScorer:
    """
    Calculates movement quality scores for physiotherapy exercises.
    """

    def __init__(self):

        # ---------------------------------
        # Deepest Knee Angles (Internal Angles)
        # ---------------------------------

        self.lowest_left_knee = 180.0
        self.lowest_right_knee = 180.0
        self.lowest_average_knee = 180.0

        # ---------------------------------
        # Stability
        # ---------------------------------

        self.angle_history = []

        # ---------------------------------
        # Movement Speed
        # ---------------------------------

        self.start_time = None
        self.timing_active = False

    # ==================================================
    # MOVEMENT CLASSIFICATION
    # ==================================================

    def classify_squat(self, average_flexion):
        """
        Classify squat depth based on average knee flexion.
        """

        if average_flexion <= 30:
            return "Standing / Mini Squat"

        elif average_flexion <= 60:
            return "Semi Squat"

        elif average_flexion <= 89:
            return "Approaching Half Squat"

        elif average_flexion <= 100:
            return "Half / Parallel Squat"

        else:
            return "Deep Squat"

    # ==================================================
    # DEPTH
    # ==================================================

    def score_depth(self, angles):

        average_internal = (
            angles["left_knee"] +
            angles["right_knee"]
        ) / 2

        average_flexion = 180 - average_internal

        if average_flexion > 100:
            return 100, "Excellent"

        elif average_flexion >= 90:
            return 100, "Excellent"

        elif average_flexion >= 61:
            return 85, "Good"

        elif average_flexion >= 31:
            return 70, "Needs Improvement"

        else:
            return 50, "Poor"

    # ==================================================
    # SYMMETRY
    # ==================================================

    def score_symmetry(self, angles):

        difference = abs(
            angles["left_knee"] -
            angles["right_knee"]
        )

        if difference < 5:
            return 100, "Excellent"

        elif difference < 10:
            return 90, "Good"

        elif difference < 20:
            return 75, "Fair"

        else:
            return 50, "Poor"

    # ==================================================
    # RANGE OF MOTION (ROM)
    # ==================================================

    def score_rom(self, angles, exercise):

        left = angles["left_knee"]
        right = angles["right_knee"]

        average = (left + right) / 2

        # ---------------------------------
        # Track Deepest Internal Knee Angles
        # ---------------------------------

        if left < self.lowest_left_knee:
            self.lowest_left_knee = left

        if right < self.lowest_right_knee:
            self.lowest_right_knee = right

        if average < self.lowest_average_knee:
            self.lowest_average_knee = average

        # ---------------------------------
        # Evaluate ROM Once Standing Again
        # ---------------------------------

        if exercise == "Standing":

            # Convert internal angle to knee flexion
            left_flexion = 180 - self.lowest_left_knee
            right_flexion = 180 - self.lowest_right_knee
            average_flexion = 180 - self.lowest_average_knee

            # Score ROM
            if average_flexion > 100:
                score = 100
                label = "Excellent"

            elif average_flexion >= 90:
                score = 100
                label = "Excellent"

            elif average_flexion >= 61:
                score = 85
                label = "Good"

            elif average_flexion >= 31:
                score = 70
                label = "Needs Improvement"

            else:
                score = 50
                label = "Poor"

            result = {
                "score": score,
                "label": label,

                # Internal Knee Angles
                "left_knee": round(self.lowest_left_knee, 1),
                "right_knee": round(self.lowest_right_knee, 1),
                "average_knee": round(self.lowest_average_knee, 1),

                # Knee Flexion
                "left_flexion": round(left_flexion, 1),
                "right_flexion": round(right_flexion, 1),
                "average_flexion": round(average_flexion, 1),

                # Clinical Interpretation
                "movement_classification": self.classify_squat(
                    average_flexion
                )
            }

            # Reset for next repetition
            self.lowest_left_knee = 180.0
            self.lowest_right_knee = 180.0
            self.lowest_average_knee = 180.0

            return result

        return None

    # ==================================================
    # STABILITY
    # ==================================================

    def score_stability(self, angles, exercise):

        average = (
            angles["left_knee"] +
            angles["right_knee"]
        ) / 2

        self.angle_history.append(average)

        if exercise == "Standing":

            if len(self.angle_history) < 5:
                self.angle_history.clear()
                return None, "Tracking..."

            variation = np.std(self.angle_history)

            self.angle_history.clear()

            if variation < 5:
                return 100, "Excellent"

            elif variation < 10:
                return 90, "Good"

            elif variation < 20:
                return 75, "Fair"

            else:
                return 50, "Unstable"

        return None, "Tracking..."

    # ==================================================
    # MOVEMENT SPEED
    # ==================================================

    def score_speed(self, exercise):

        if exercise != "Standing" and not self.timing_active:

            self.start_time = time.time()
            self.timing_active = True

        elif exercise == "Standing" and self.timing_active:

            elapsed = time.time() - self.start_time

            self.timing_active = False
            self.start_time = None

            if 2 <= elapsed <= 4:
                return 100, "Excellent", elapsed

            elif 1.5 <= elapsed < 2 or 4 < elapsed <= 5:
                return 90, "Good", elapsed

            elif 1 <= elapsed < 1.5 or 5 < elapsed <= 6:
                return 75, "Fair", elapsed

            else:
                return 50, "Needs Improvement", elapsed

        return None, "Tracking...", None

    # ==================================================
    # OVERALL SCORE
    # ==================================================

    def overall_score(self, angles):

        depth_score, depth_label = self.score_depth(angles)

        symmetry_score, symmetry_label = self.score_symmetry(angles)

        overall = int(
            (depth_score + symmetry_score) / 2
        )

        if overall >= 95:
            assessment = "Excellent Movement"

        elif overall >= 85:
            assessment = "Good Movement"

        elif overall >= 70:
            assessment = "Fair Movement"

        else:
            assessment = "Needs Improvement"

        return {
            "overall_score": overall,
            "assessment": assessment,
            "depth_score": depth_score,
            "depth_label": depth_label,
            "symmetry_score": symmetry_score,
            "symmetry_label": symmetry_label,
        }