from cryptography.fernet import Fernet
user="root"
file = open('key.key', 'rb') 
key = file.read()  
file.close()
f = Fernet(key)
encrypted = b'gAAAAABfdswWscdZ2DToEyY1CVwzdb7HgQn6DO_fEr9ObW0JI4IDpN_fwCYafSiEz8UVKLizYGaxrri6k_VDbyENfMjs7ewt2w=='
decrypted = f.decrypt(encrypted)
decrypted_password = decrypted.decode()
encrypted = b'gAAAAABfdswvEYu_i_jlqyuGRjm0Ks7az4_XZEO4KUaSDaW4LgeK-cObel8Pc69gyjIKzsyDwfBOeeqQicmuRzZWLX2t-uIhJA=='
decrypted = f.decrypt(encrypted)
decrypted_key = decrypted.decode()
