import time
import numpy as np


class MovementScorer:
    """
    Calculates movement quality scores for
    physiotherapy exercises.
    """

    def __init__(self):

        # ==========================================
        # Deepest Knee Angles (Internal)
        # ==========================================

        self.lowest_left_knee = 180.0
        self.lowest_right_knee = 180.0
        self.lowest_average_knee = 180.0

        # ==========================================
        # Best Movement Achieved
        # ==========================================

        self.best_movement = "Standing"

        self.best_depth_score = 50
        self.best_depth_label = "Poor"

        # ==========================================
        # Stability Tracking
        # ==========================================

        self.angle_history = []

        # ==========================================
        # Speed Tracking
        # ==========================================

        self.start_time = None
        self.timing_active = False

    # ==================================================
    # RESET
    # ==================================================

    def reset(self):
        """
        Reset tracking variables for a new session.
        """

        self.lowest_left_knee = 180.0
        self.lowest_right_knee = 180.0
        self.lowest_average_knee = 180.0

        self.best_movement = "Standing"

        self.best_depth_score = 50
        self.best_depth_label = "Poor"

        self.angle_history.clear()

        self.start_time = None
        self.timing_active = False

    # ==================================================
    # MOVEMENT CLASSIFICATION
    # ==================================================

    def classify_squat(self, average_flexion):
        """
        Convert knee flexion into a squat stage.
        """

        if average_flexion <= 30:
            return "Standing"

        elif average_flexion <= 60:
            return "Mini Squat"

        elif average_flexion <= 89:
            return "Approaching Half Squat"

        elif average_flexion <= 100:
            return "Half Squat"

        return "Deep Squat"

    # ==================================================
    # DEPTH GRADE
    # ==================================================

    def _depth_grade(self, flexion):
        """
        Convert knee flexion into a movement
        quality score.
        """

        if flexion >= 100:
            return 100, "Excellent"

        elif flexion >= 90:
            return 90, "Good"

        elif flexion >= 61:
            return 75, "Fair"

        elif flexion >= 31:
            return 60, "Needs Improvement"

        return 50, "Poor"

    # ==================================================
    # HELPER
    # ==================================================

    def _calculate_flexion(self, angles):
        """
        Convert internal knee angles into
        clinical knee flexion values.
        """

        left_internal = angles["left_knee"]
        right_internal = angles["right_knee"]

        average_internal = (
            left_internal +
            right_internal
        ) / 2

        left_flexion = 180 - left_internal
        right_flexion = 180 - right_internal
        average_flexion = 180 - average_internal

        return {

            "left_internal": left_internal,
            "right_internal": right_internal,
            "average_internal": average_internal,

            "left_flexion": left_flexion,
            "right_flexion": right_flexion,
            "average_flexion": average_flexion
        }

        # ==================================================
    # LIVE MOVEMENT
    # ==================================================

    def get_live_movement(self, angles):
        """
        Get the current movement stage based on
        the latest frame.
        """

        data = self._calculate_flexion(
            angles
        )

        movement = self.classify_squat(
            data["average_flexion"]
        )

        return {

            "left_flexion": round(
                data["left_flexion"], 1
            ),

            "right_flexion": round(
                data["right_flexion"], 1
            ),

            "average_flexion": round(
                data["average_flexion"], 1
            ),

            "movement_classification":
                movement

        }

    # ==================================================
    # LIVE SCORE
    # ==================================================

    def get_live_score(self, angles):
        """
        Calculate the live movement score.
        """

        depth_score, _ = self.score_depth(
            angles
        )

        symmetry_score, _ = self.score_symmetry(
            angles
        )

        score = int(
            (depth_score + symmetry_score) / 2
        )

        if score >= 95:
            assessment = "Excellent"

        elif score >= 85:
            assessment = "Good"

        elif score >= 70:
            assessment = "Fair"

        else:
            assessment = "Needs Improvement"

        return {

            "score": score,

            "assessment": assessment

        }

    # ==================================================
    # DEPTH
    # ==================================================

    def score_depth(self, angles):
        """
        Evaluate movement depth using
        clinical knee flexion.
        """

        data = self._calculate_flexion(
            angles
        )

        depth_score, depth_label = self._depth_grade(
            data["average_flexion"]
        )

        return depth_score, depth_label

    # ==================================================
    # SYMMETRY
    # ==================================================

    def score_symmetry(self, angles):
        """
        Evaluate left/right knee symmetry.
        """

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

        return 50, "Poor"

    # ==================================================
    # RANGE OF MOTION
    # ==================================================

    def score_rom(self, angles, exercise):
        """
        Track the deepest squat achieved
        during one repetition.
        """

        data = self._calculate_flexion(
            angles
        )

        movement = self.classify_squat(
            data["average_flexion"]
        )

        # ------------------------------------------
        # Store deepest internal angles
        # ------------------------------------------

        if data["left_internal"] < self.lowest_left_knee:

            self.lowest_left_knee = data["left_internal"]

        if data["right_internal"] < self.lowest_right_knee:

            self.lowest_right_knee = data["right_internal"]

        if data["average_internal"] < self.lowest_average_knee:

            self.lowest_average_knee = data["average_internal"]

        # ------------------------------------------
        # Store BEST movement achieved
        # ------------------------------------------

        movement_rank = {

            "Standing": 0,

            "Mini Squat": 1,

            "Approaching Half Squat": 2,

            "Half Squat": 3,

            "Deep Squat": 4

        }

        if movement_rank[movement] > movement_rank[self.best_movement]:

            self.best_movement = movement

            self.best_depth_score, self.best_depth_label = (
                self._depth_grade(
                    data["average_flexion"]
                )
            )

        # ------------------------------------------
        # Wait until repetition completes
        # ------------------------------------------

        if exercise != "Standing":

            return None

        # ------------------------------------------
        # Calculate ROM
        # ------------------------------------------

        left_flexion = 180 - self.lowest_left_knee

        right_flexion = 180 - self.lowest_right_knee

        average_flexion = 180 - self.lowest_average_knee

        result = {

            "score": self.best_depth_score,

            "label": self.best_depth_label,

            "left_knee": round(
                self.lowest_left_knee, 1
            ),

            "right_knee": round(
                self.lowest_right_knee, 1
            ),

            "average_knee": round(
                self.lowest_average_knee, 1
            ),

            "left_flexion": round(
                left_flexion, 1
            ),

            "right_flexion": round(
                right_flexion, 1
            ),

            "average_flexion": round(
                average_flexion, 1
            ),

            "movement_classification":
                self.best_movement

        }

        # ------------------------------------------
        # Reset repetition tracking
        # ------------------------------------------

        self.lowest_left_knee = 180.0
        self.lowest_right_knee = 180.0
        self.lowest_average_knee = 180.0

        self.best_movement = "Standing"

        self.best_depth_score = 50
        self.best_depth_label = "Poor"

        return result

        # ==================================================
    # STABILITY
    # ==================================================

    def score_stability(self, angles, exercise):
        """
        Evaluate movement stability based on the variation
        of knee angles throughout one repetition.
        """

        data = self._calculate_flexion(
            angles
        )

        self.angle_history.append(
            data["average_internal"]
        )

        if exercise != "Standing":

            return None, "Tracking..."

        if len(self.angle_history) < 5:

            self.angle_history.clear()

            return None, "Tracking..."

        variation = np.std(
            self.angle_history
        )

        self.angle_history.clear()

        if variation < 5:

            return 100, "Excellent"

        elif variation < 10:

            return 90, "Good"

        elif variation < 20:

            return 75, "Fair"

        return 50, "Unstable"

    # ==================================================
    # SPEED
    # ==================================================

    def score_speed(self, exercise):
        """
        Evaluate repetition speed.
        """

        if exercise != "Standing" and not self.timing_active:

            self.start_time = time.time()

            self.timing_active = True

        elif exercise == "Standing" and self.timing_active:

            elapsed = time.time() - self.start_time

            self.start_time = None

            self.timing_active = False

            if 2 <= elapsed <= 6:

                return 100, "Excellent", elapsed

            elif 6 < elapsed <= 8:

                return 90, "Good", elapsed

            elif 8 < elapsed <= 10:

                return 75, "Fair", elapsed

            return 50, "Needs Improvement", elapsed

        return None, "Tracking...", None

    # ==================================================
    # OVERALL SCORE
    # ==================================================

    def overall_score(self, angles):
        """
        Calculate the overall movement quality score.

        Uses the LIVE symmetry together with the BEST
        depth reached during the repetition.
        """

        symmetry_score, symmetry_label = self.score_symmetry(
            angles
        )

        depth_score = self.best_depth_score

        depth_label = self.best_depth_label

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

            "symmetry_label": symmetry_label

        }

        # ==================================================
    # LIVE COACHING FEEDBACK
    # ==================================================

    def get_live_feedback(self, angles):
        """
        Generate real-time physiotherapy coaching feedback.
        """

        live = self.get_live_movement(
            angles
        )

        live_score = self.get_live_score(
            angles
        )

        movement = live["movement_classification"]

        score = live_score["score"]

        # ------------------------------------------
        # Feedback based on movement stage
        # ------------------------------------------

        if movement == "Standing":

            feedback = (
                "Ready to begin the squat."
            )

        elif movement == "Mini Squat":

            feedback = (
                "Good start. Continue lowering your hips."
            )

        elif movement == "Approaching Half Squat":

            feedback = (
                "Almost there. Keep your knees aligned."
            )

        elif movement == "Half Squat":

            feedback = (
                "Excellent therapeutic squat depth."
            )

        elif movement == "Deep Squat":

            feedback = (
                "Excellent depth. Maintain control while returning."
            )

        else:

            feedback = (
                "Tracking movement..."
            )

        # ------------------------------------------
        # Override feedback if movement quality
        # becomes poor.
        # ------------------------------------------

        if score < 70:

            feedback = (
                "Improve knee alignment and squat depth."
            )

        return {

            "score": score,

            "assessment":
                live_score["assessment"],

            "movement":
                movement,

            "feedback":
                feedback

        }