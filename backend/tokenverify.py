from flask import Flask 
from flask import jsonify
from flask import request
from connection import mysqldb
from mysql.connector import Error
from mysql.connector import errorcode
from readkey import decrypted_key
from flask_cors import CORS
import mysql.connector
import os
from readkey import user,decrypted_password # Using this file to import username, decrypted_password 
from macaddress import mac_address
app = Flask("Pec Server") 
CORS(app)
@app.route('/tokenverify' , methods=['POST', 'GET'])
def tokenverify():
    req = request.get_json()
    username=  req['user_exists']
    print(username)   
    mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )
    print("Database connection created successfully.")
    mycursor = mysqldb.cursor()
    mycursor.execute("select mac_address from ads where username = aes_encrypt( '" +username+ "','birbal');")
    mac_exists = mycursor.fetchone()
    if(mac_exists == None or mac_exists[0] != mac_address):
       validate = ''
    else:
       mycursor.execute("select token from ads where username = aes_encrypt( '" +username+ "','birbal');")
       token = mycursor.fetchone()
       print(token)
       if(token == None):
          validate = ''
       else:
          validate = token[0]
    print(validate)
    mycursor.close()
    return jsonify({'token':validate})


# main driver function 
if __name__ == '__main__':  
    app.run(host= '127.0.0.1' , port = '5005') 