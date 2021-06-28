#Read the key from key.key file and use that key to decrypt the encrypted message.
from cryptography.fernet import Fernet
user="root"
#file = open('key.key', 'rb') 
key = 'hmbLVWJ3uDzIcw1n3q0CoB133-tROZYhse4wLjZ5ioE='
#file.close()
f = Fernet(key)
encrypted = b'gAAAAABfWLTNGNOFMVyOgFiiuZKVmTmvcsi8EMe0gWA4yY1pAVCBCjmMwd1EJ3vEA5zI--JQM21c7cWATrO6L-GQyS73nbSr7Q=='
decrypted = f.decrypt(encrypted)
decrypted_password = decrypted.decode()
encrypted = b'gAAAAABfWfyO99zbgfx17aGNfC-uOh5yk6bx3FDaqZhm4cuvXcQuwredLxqh_DSKTQFnOkN6QAh3FUVFXCgPcko9YRD6GVGK8g=='
decrypted = f.decrypt(encrypted)
decrypted_key = decrypted.decode()

