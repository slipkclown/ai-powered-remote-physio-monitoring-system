from collections import deque


class AngleFilter:
    """
    Smooths joint angles using a moving average filter.

    A separate history is maintained for each joint angle.
    """

    def __init__(self, window_size=5):
        """
        Parameters
        ----------
        window_size : int
            Number of recent values used to calculate
            the moving average.
        """

        if window_size < 1:
            raise ValueError("window_size must be at least 1.")

        self.window_size = window_size
        self.history = {}

    def smooth(self, name, value):
        """
        Smooth a single joint angle.

        Parameters
        ----------
        name : str
            Joint name (e.g., 'left_knee').

        value : float
            Latest measured joint angle.

        Returns
        -------
        float
            Smoothed joint angle.
        """

        if value is None:
            return None

        if name not in self.history:
            self.history[name] = deque(maxlen=self.window_size)

        self.history[name].append(value)

        return sum(self.history[name]) / len(self.history[name])

    def reset(self):
        """
        Clear all stored angle history.
        Useful when starting a new exercise session.
        """
        self.history.clear()