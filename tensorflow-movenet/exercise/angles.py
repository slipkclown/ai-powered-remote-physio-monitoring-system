import numpy as np


def calculate_angle(point_a, point_b, point_c) -> float:
    """
    Calculate the angle (in degrees) formed by three points.

    Parameters
    ----------
    point_a : array-like
        First point (x, y)

    point_b : array-like
        Middle point (joint where the angle is measured)

    point_c : array-like
        Third point (x, y)

    Returns
    -------
    float
        Angle in degrees (0–180)
    """

    point_a = np.array(point_a)
    point_b = np.array(point_b)
    point_c = np.array(point_c)

    # Angle between BA and BC
    radians = (
        np.arctan2(point_c[1] - point_b[1], point_c[0] - point_b[0])
        - np.arctan2(point_a[1] - point_b[1], point_a[0] - point_b[0])
    )

    angle = np.abs(np.degrees(radians))

    if angle > 180:
        angle = 360 - angle

    return angle

if __name__ == "__main__":

    a = [0, 1]
    b = [0, 0]
    c = [1, 0]

    angle = calculate_angle(a, b, c)

    print(f"Angle: {angle:.1f}°")