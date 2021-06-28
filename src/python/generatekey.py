#THis file is primarily used to generate a key and after getting a key, save it into key.key extension file and it will
#be placed in hard drive automaticaly. Now use this key to encrypt the messages by suing line 8 of code.
from cryptography.fernet import Fernet
message = "hello".encode()  # .encode() is used to turn the string to bytes
#key = Fernet.generate_key()  # Store this key or get if you already have it
f = Fernet(b'9GPQYlpT-Rqyx5pUs1orm1opsWKFWmmiPGLv7j24cow=')
#print(key)
encrypted = f.encrypt(message) # General method to get an encrypted string for the message
decrypted = f.decrypt(encrypted)
print(encrypted)
print(decrypted.decode())