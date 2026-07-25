class ExerciseCounter:
    """
    Counts squat repetitions using movement phases.

    Valid repetition:

        Standing
            ↓
        Mini Squat
            ↓
        Approaching Half Squat
            ↓
        Half Squat / Deep Squat
            ↓
        Standing
    """

    def __init__(self):
        self.reset()

    def reset(self):

        self.reps = 0
        self.state = "Waiting"

    def get_state(self):

        return self.state

    def update(self, current_state):

        if current_state == "Not Recognized":
            return self.reps

        # ------------------------------------
        # Waiting
        # ------------------------------------

        if self.state == "Waiting":

            if current_state == "Standing":
                self.state = "Standing"

        # ------------------------------------
        # Standing
        # ------------------------------------

        elif self.state == "Standing":

            if current_state in (
                "Mini Squat",
                "Approaching Half Squat",
                "Half Squat",
                "Deep Squat"
            ):
                self.state = "Descending"

        # ------------------------------------
        # Descending
        # ------------------------------------

        elif self.state == "Descending":

            if current_state in (
                "Half Squat",
                "Deep Squat"
            ):
                self.state = "Bottom"

            elif current_state == "Standing":
                self.state = "Standing"

        # ------------------------------------
        # Bottom
        # ------------------------------------

        elif self.state == "Bottom":

            if current_state in (
                "Mini Squat",
                "Approaching Half Squat"
            ):
                self.state = "Ascending"

        # ------------------------------------
        # Ascending
        # ------------------------------------

        elif self.state == "Ascending":

            if current_state == "Standing":

                self.reps += 1
                self.state = "Standing"

            elif current_state == "Deep Squat":

                self.state = "Bottom"

        return self.reps