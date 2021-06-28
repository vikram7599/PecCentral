from flask import Flask 
from flask import jsonify
from flask import request
from mysql.connector import Error
from mysql.connector import errorcode
from readkey import decrypted_key
import mysql.connector
from readkey import user,decrypted_password
from flask_cors import CORS
app = Flask("Pec Server") 
CORS(app)
@app.route('/getUsersInfo' , methods=['POST', 'GET'])
def usersInfo():
	mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )

	mycursor = mysqldb.cursor()
	mycursor.execute("select name,aes_decrypt(username,'"+decrypted_key+"'),aes_decrypt(mobile_number,'"+decrypted_key+"'),email_id,branch,profile_image from userinfo")
	result = mycursor.fetchall()
	mycursor.close()
	return jsonify({'data':result}) ;

@app.route('/getUserInfo' , methods=['POST', 'GET'])
def userInfo():
	req = request.get_json()
	username = req['username']
	mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )

	mycursor = mysqldb.cursor()
	mycursor.execute("select name,aes_decrypt(username,'"+decrypted_key+"'),aes_decrypt(mobile_number,'"+decrypted_key+"'),email_id,branch,profile_image from userinfo where aes_decrypt(username,'"+decrypted_key+"')= '"+username+"'")
	result = mycursor.fetchall()
	mycursor.close()
	return jsonify({'data':result}) ;
    
# main driver function 
if __name__ == '__main__':  
    app.run(host= '127.0.0.1' , port = '5004')