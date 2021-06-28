import socket    
hostname = socket.gethostname()    
IPAddr = socket.gethostbyname(hostname)       
mac_address = IPAddr
print(mac_address)