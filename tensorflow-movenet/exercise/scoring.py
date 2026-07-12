import time
import numpy as np


class MovementScorer:
    """
    Calculates movement quality scores for physiotherapy exercises.
    """

    def __init__(self):

        # ---------------------------------
        # Deepest Knee Angles (ROM)
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
    # DEPTH
    # ==================================================

    def score_depth(self, angles):

        average = (
            angles["left_knee"] +
            angles["right_knee"]
        ) / 2

        if average < 90:
            return 100, "Excellent"

        elif average < 110:
            return 85, "Good"

        elif average < 130:
            return 70, "Fair"

        else:
            return 50, "Needs Improvement"

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
        # Track deepest angles
        # ---------------------------------

        if left < self.lowest_left_knee:
            self.lowest_left_knee = left

        if right < self.lowest_right_knee:
            self.lowest_right_knee = right

        if average < self.lowest_average_knee:
            self.lowest_average_knee = average

        # ---------------------------------
        # Score ROM once standing again
        # ---------------------------------

        if exercise == "Standing":

            deepest = self.lowest_average_knee

            if deepest < 90:
                score = 100
                label = "Excellent"

            elif deepest < 110:
                score = 85
                label = "Good"

            elif deepest < 130:
                score = 70
                label = "Fair"

            else:
                score = 50
                label = "Limited"

            result = {
                "score": score,
                "label": label,
                "left_knee": round(self.lowest_left_knee, 1),
                "right_knee": round(self.lowest_right_knee, 1),
                "average_knee": round(self.lowest_average_knee, 1),
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