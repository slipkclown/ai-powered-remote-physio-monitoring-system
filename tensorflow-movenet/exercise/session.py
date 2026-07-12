class ExerciseSession:
    """
    Manages a physiotherapy exercise session.

    Tracks:
    - Exercise type
    - Number of sets
    - Repetitions per set
    - Current set
    - Current repetition
    - Overall progress
    """

    def __init__(self, exercise_type, total_sets, reps_per_set):
        self.exercise_type = exercise_type

        self.total_sets = total_sets
        self.reps_per_set = reps_per_set

        self.current_set = 1
        self.current_rep = 0

        self.total_completed_reps = 0

    # ---------------------------------
    # Record One Completed Repetition
    # ---------------------------------

    def record_rep(self):
        """
        Record one completed repetition.
        """

        if self.is_complete():
            return

        self.current_rep += 1
        self.total_completed_reps += 1

        # Move to next set
        if self.current_rep >= self.reps_per_set:

            if self.current_set < self.total_sets:
                self.current_set += 1
                self.current_rep = 0

    # ---------------------------------
    # Session Completion
    # ---------------------------------

    def is_complete(self):
        """
        Returns True when the prescribed
        exercise session is complete.
        """

        return (
            self.total_completed_reps
            >= self.total_sets * self.reps_per_set
        )

    # ---------------------------------
    # Progress Percentage
    # ---------------------------------

    def progress_percentage(self):
        """
        Returns session completion percentage.
        """

        total_required = (
            self.total_sets *
            self.reps_per_set
        )

        return round(
            (self.total_completed_reps / total_required) * 100,
            1
        )

    # ---------------------------------
    # Remaining Repetitions
    # ---------------------------------

    def remaining_reps(self):
        """
        Returns remaining repetitions.
        """

        return (
            self.total_sets *
            self.reps_per_set
            - self.total_completed_reps
        )

    # ---------------------------------
    # Session Summary
    # ---------------------------------

    def summary(self):
        """
        Returns session information.
        """

        return {

            "exercise": self.exercise_type,

            "current_set": self.current_set,

            "total_sets": self.total_sets,

            "current_rep": self.current_rep,

            "reps_per_set": self.reps_per_set,

            "completed_reps": self.total_completed_reps,

            "remaining_reps": self.remaining_reps(),

            "progress": self.progress_percentage(),

            "completed": self.is_complete()

        }

    # ---------------------------------
    # Display Session Information
    # ---------------------------------

    def display(self):
        """
        Print session progress.
        """

        print("\n==========================================")

        print("AI REMOTE PHYSIOTHERAPY SESSION")

        print("==========================================")

        print(f"Exercise            : {self.exercise_type}")

        print(f"Current Set         : {self.current_set}/{self.total_sets}")

        print(f"Current Repetition  : {self.current_rep}/{self.reps_per_set}")

        print(f"Completed Reps      : {self.total_completed_reps}")

        print(f"Remaining Reps      : {self.remaining_reps()}")

        print(f"Progress            : {self.progress_percentage()}%")

        print("==========================================\n")


# ---------------------------------
# Testing
# ---------------------------------

if __name__ == "__main__":

    session = ExerciseSession(
        exercise_type="Squat",
        total_sets=3,
        reps_per_set=10
    )

    while not session.is_complete():

        session.record_rep()

        session.display()

    print("🎉 Physiotherapy session completed successfully!")