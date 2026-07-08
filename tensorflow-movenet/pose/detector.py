import cv2
import tensorflow as tf
import tensorflow_hub as hub


class MoveNetDetector:
    def __init__(self):
        print("📦 Loading MoveNet model...")

        model = hub.load(
            "https://tfhub.dev/google/movenet/singlepose/lightning/4"
        )

        self.movenet = model.signatures["serving_default"]

        print("✅ MoveNet loaded successfully!")

    def detect(self, frame):
        """
        Detect human pose keypoints from a webcam frame.

        Parameters:
            frame (numpy.ndarray): BGR image from OpenCV.

        Returns:
            numpy.ndarray: MoveNet output with shape (1, 1, 17, 3)
        """

        # Convert OpenCV BGR image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Resize image to MoveNet input size (192x192)
        image = tf.image.resize_with_pad(image, 192, 192)

        # MoveNet expects int32 input
        input_image = tf.cast(image, dtype=tf.int32)

        # Add batch dimension
        input_image = tf.expand_dims(input_image, axis=0)

        # Run inference
        outputs = self.movenet(input_image)

        # Return the detected keypoints
        return outputs["output_0"].numpy()