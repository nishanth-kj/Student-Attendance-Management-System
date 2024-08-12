import base64
import io
import numpy as np
from attendance.utils import get_face_encoding, compare_faces

class BiometricService:
    @staticmethod
    def extract_encoding(image_input):
        """
        Extract face encoding from base64 string or bytes.
        """
        try:
            if isinstance(image_input, str) and 'base64,' in image_input:
                _, imgstr = image_input.split(';base64,')
                image_bytes = base64.b64decode(imgstr)
            else:
                image_bytes = image_input

            image_file = io.BytesIO(image_bytes)
            encoding = get_face_encoding(image_file)
            return encoding
        except Exception as e:
            print(f"Biometric extraction error: {e}")
            return None

    @staticmethod
    def identify_user(candidate_encoding, user_queryset):
        """
        Identify a user from a queryset given a candidate encoding.
        Returns the user object or None.
        """
        # Collect all valid user encodings
        users_with_embeddings = [u for u in user_queryset if u.face_embedding]
        if not users_with_embeddings:
            return None

        known_encodings = [
            np.frombuffer(u.face_embedding, dtype=np.float64) 
            for u in users_with_embeddings
        ]

        matches = compare_faces(known_encodings, candidate_encoding)
        
        if any(matches):
            first_match_index = matches.index(True)
            return users_with_embeddings[first_match_index]
            
        return None
