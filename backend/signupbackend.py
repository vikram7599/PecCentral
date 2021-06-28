from flask import Flask 
from flask import jsonify
from flask import request
from connection import mysqldb
from mysql.connector import Error
from mysql.connector import errorcode
from mac_address import mac_address
from readkey import decrypted_key
from flask_cors import CORS
import secrets;
app = Flask("Pec Server") 
CORS(app)
@app.route('/signup', methods=['POST', 'GET'])  
def signup():
	req = request.get_json()
	username = req['username']
	name = req['name']
	password = req['password']
	email_id = req['email_id']
	branch = req['branch']
	mobile_number = req['mobile_number']
	mycursor = mysqldb.cursor()
	mycursor.execute("select count(*) from userinfo where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
	username_exists = mycursor.fetchone()
	mycursor.execute("select count(*) from userinfo where password = md5('"+ password +"')")
	password_exists = mycursor.fetchone()
	if(username_exists[0] == 1  and password_exists[0] == 1):
		status_code = 0 # Both already exists so change them
	elif(username_exists[0] == 1  and password_exists[0] == 0):
		status_code = 1 # Username already exists
	elif(username_exists[0] == 0  and password_exists[0] == 1):
		status_code = 2 # password already exists
	else:
		mycursor.execute("insert into userinfo values (aes_encrypt('"+username+"','"+decrypted_key+"'),'"+name+"',md5('"+password+"'),'"+email_id+"','"+branch+"',aes_encrypt('"+mobile_number+"','"+decrypted_key+"'))")
		token = secrets.token_urlsafe()
		mycursor.execute("select count(*) from ads where username = aes_encrypt('" +username+ "','birbal');")
		username_exists = mycursor.fetchone()
		if(username_exists[0] > 0):
			mycursor.execute("delete from ads where username = aes_encrypt('"+username+"','birbal');")
			mysqldb.commit()
		mycursor.execute("insert into ads(username,token,mac_address) values (aes_encrypt('"+username+"','"+decrypted_key+"'),'"+token+"','"+mac_address+"')")
		mysqldb.commit()
		status_code = 3
	mycursor.close()
	return jsonify({'status':status_code,'token': token})  
# main driver function 
if __name__ == '__main__':  
    app.run(host= '127.0.0.1' , port = '5001') 