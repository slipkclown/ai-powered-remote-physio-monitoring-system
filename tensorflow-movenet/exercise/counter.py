class ExerciseCounter:
    """
    Counts squat repetitions using a simple state machine.
    """

    def __init__(self):
        self.reps = 0
        self.was_squatting = False

    def update(self, current_state):

        # User reached the bottom
        if current_state == "Squatting":
            self.was_squatting = True

        # Count rep when they stand back up
        if self.was_squatting and current_state == "Standing":
            self.reps += 1
            self.was_squatting = False

        return self.reps