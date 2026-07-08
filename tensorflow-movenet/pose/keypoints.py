"""
MoveNet Body Keypoints

Each keypoint corresponds to the index returned by MoveNet.

Output shape:
(1, 1, 17, 3)

The last dimension contains:
(y, x, confidence)
"""

# Face
NOSE = 0
LEFT_EYE = 1
RIGHT_EYE = 2
LEFT_EAR = 3
RIGHT_EAR = 4

# Upper Body
LEFT_SHOULDER = 5
RIGHT_SHOULDER = 6
LEFT_ELBOW = 7
RIGHT_ELBOW = 8
LEFT_WRIST = 9
RIGHT_WRIST = 10

# Lower Body
LEFT_HIP = 11
RIGHT_HIP = 12
LEFT_KNEE = 13
RIGHT_KNEE = 14
LEFT_ANKLE = 15
RIGHT_ANKLE = 16


KEYPOINT_NAMES = {
    NOSE: "Nose",
    LEFT_EYE: "Left Eye",
    RIGHT_EYE: "Right Eye",
    LEFT_EAR: "Left Ear",
    RIGHT_EAR: "Right Ear",
    LEFT_SHOULDER: "Left Shoulder",
    RIGHT_SHOULDER: "Right Shoulder",
    LEFT_ELBOW: "Left Elbow",
    RIGHT_ELBOW: "Right Elbow",
    LEFT_WRIST: "Left Wrist",
    RIGHT_WRIST: "Right Wrist",
    LEFT_HIP: "Left Hip",
    RIGHT_HIP: "Right Hip",
    LEFT_KNEE: "Left Knee",
    RIGHT_KNEE: "Right Knee",
    LEFT_ANKLE: "Left Ankle",
    RIGHT_ANKLE: "Right Ankle",
}