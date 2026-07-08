class AngleFilter:
    """
    Smooths joint angles using a moving average.
    """

    def __init__(self, window_size=5):
        self.window_size = window_size
        self.history = {}

    def smooth(self, name, value):
        """
        Smooth one angle.

        Parameters
        ----------
        name : str
            Name of the angle (e.g. 'left_elbow')

        value : float
            Latest measured angle

        Returns
        -------
        float
            Smoothed angle
        """

        if value is None:
            return None

        if name not in self.history:
            self.history[name] = []

        self.history[name].append(value)

        # Keep only the newest values
        if len(self.history[name]) > self.window_size:
            self.history[name].pop(0)

        return sum(self.history[name]) / len(self.history[name])