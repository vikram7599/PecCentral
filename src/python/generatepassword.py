import os, random, string

length = 40
chars = string.ascii_letters + string.digits + '!@#$%^&*[]<>()'
random.seed = (os.urandom(1024))

generate_password = ''.join(random.choice(chars) for i in range(length))