import mysql.connector
import os
from readkey import user,decrypted_password

mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )
print("Database connection created successfully.")