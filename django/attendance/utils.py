import face_recognition
import numpy as np
import cv2
import base64
from PIL import Image
import io

def get_face_encoding(image_file):
    """
    Given an image file, return the face encoding as a numpy array.
    """
    image = face_recognition.load_image_file(image_file)
    encodings = face_recognition.face_encodings(image)
    if encodings:
        return encodings[0]
    return None

def compare_faces(known_encodings, face_to_check_encoding, tolerance=0.6):
    """
    Compare a list of face encodings against a candidate encoding.
    """
    if not known_encodings:
        return []
    
    return face_recognition.compare_faces(known_encodings, face_to_check_encoding, tolerance)

def get_face_distances(known_encodings, face_to_check_encoding):
    """
    Get the Euclidean distance for each known face against the candidate.
    """
    if not known_encodings:
        return []
    
    return face_recognition.face_distance(known_encodings, face_to_check_encoding)

def decode_base64_image(data_url):
    """
    Decode a base64 data URL to a numpy array (OpenCV format).
    """
    try:
        _, encoded = data_url.split(',', 1)
        image_data = base64.b64decode(encoded)
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        return frame
    except Exception:
        return None
