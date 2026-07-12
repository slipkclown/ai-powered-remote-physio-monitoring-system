class ExerciseCounter:
    """
    Counts squat repetitions using a movement
    state machine.

    Valid repetition:

    Standing
        ↓
    Moving
        ↓
    Squatting
        ↓
    Moving
        ↓
    Standing
    """

    def __init__(self):

        self.reps = 0

        self.state = "Waiting"

    def update(self, current_state):
        """
        Update repetition counter based on
        exercise state.
        """

        # -----------------------------
        # Waiting -> Standing
        # -----------------------------
        if self.state == "Waiting":

            if current_state == "Standing":
                self.state = "Standing"

        # -----------------------------
        # Standing -> Moving
        # -----------------------------
        elif self.state == "Standing":

            if current_state == "Moving":
                self.state = "Descending"

        # -----------------------------
        # Moving -> Squatting
        # -----------------------------
        elif self.state == "Descending":

            if current_state == "Squatting":
                self.state = "Bottom"

            elif current_state == "Standing":
                self.state = "Standing"

        # -----------------------------
        # Squatting -> Moving
        # -----------------------------
        elif self.state == "Bottom":

            if current_state == "Moving":
                self.state = "Ascending"

        # -----------------------------
        # Moving -> Standing
        # -----------------------------
        elif self.state == "Ascending":

            if current_state == "Standing":

                self.reps += 1

                self.state = "Standing"

            elif current_state == "Squatting":
                self.state = "Bottom"

        return self.reps