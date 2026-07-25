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

        if total_sets < 1:
            raise ValueError("total_sets must be at least 1.")

        if reps_per_set < 1:
            raise ValueError("reps_per_set must be at least 1.")

        self.exercise_type = exercise_type

        self.total_sets = total_sets
        self.reps_per_set = reps_per_set

        self.current_set = 1
        self.current_rep = 0

        self.total_completed_reps = 0

    # ==================================================
    # RECORD REPETITION
    # ==================================================

    def record_rep(self):

        if self.is_complete():
            return

        self.current_rep += 1
        self.total_completed_reps += 1

        if self.current_rep >= self.reps_per_set:

            if self.current_set < self.total_sets:

                self.current_set += 1
                self.current_rep = 0

    # ==================================================
    # SESSION STATUS
    # ==================================================

    def is_complete(self):

        total_required = (
            self.total_sets *
            self.reps_per_set
        )

        return self.total_completed_reps >= total_required

    # ==================================================
    # PROGRESS
    # ==================================================

    def progress_percentage(self):

        total_required = (
            self.total_sets *
            self.reps_per_set
        )

        return round(
            (self.total_completed_reps / total_required) * 100,
            1
        )

    # ==================================================
    # REMAINING REPETITIONS
    # ==================================================

    def remaining_reps(self):

        total_required = (
            self.total_sets *
            self.reps_per_set
        )

        return max(
            0,
            total_required - self.total_completed_reps
        )

    # ==================================================
    # RESET
    # ==================================================

    def reset(self):

        self.current_set = 1
        self.current_rep = 0
        self.total_completed_reps = 0

    # ==================================================
    # SUMMARY
    # ==================================================

    def summary(self):

        return {

            "exercise": self.exercise_type,

            "sets_completed": min(
                self.current_set,
                self.total_sets
            ),

            "total_sets": self.total_sets,

            "completed_reps": self.total_completed_reps,

            "remaining_reps": self.remaining_reps(),

            "progress": self.progress_percentage(),

            "completed": self.is_complete(),

            "status":
                "Completed"
                if self.is_complete()
                else "In Progress"

        }

    # ==================================================
    # DISPLAY
    # ==================================================

    def display(self):

        print("\n==================================================")
        print("      AI REMOTE PHYSIOTHERAPY SESSION")
        print("==================================================")

        print(f"Exercise             : {self.exercise_type}")
        print(f"Current Set          : {self.current_set}/{self.total_sets}")
        print(f"Current Repetition   : {self.current_rep}/{self.reps_per_set}")
        print(f"Completed Reps       : {self.total_completed_reps}")
        print(f"Remaining Reps       : {self.remaining_reps()}")
        print(f"Progress             : {self.progress_percentage()}%")

        if self.is_complete():

            print("\nSession Status       : Completed ✅")

        else:

            print("\nSession Status       : In Progress")

        print("==================================================\n")


# ==================================================
# TESTING
# ==================================================

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