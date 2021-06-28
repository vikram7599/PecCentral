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
@app.route('/newsfeedbackend' , methods=['POST', 'GET'])
def newsfeedbackend():
	req = request.get_json()
	pageStatus = req['pageStatus']
	mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )

	mycursor = mysqldb.cursor()
	mycursor.execute("select count(*) from formpost")
	result = mycursor.fetchone()
	postNumber = result[0] - pageStatus - 5
	
	if(result[0]-pageStatus <= 0):
		mycursor.close()
		return jsonify({'status':'1', 'data':''}) ;
	elif(postNumber < 0):
		status_code = 1
		mycursor.execute("select aes_decrypt(Username,'"+decrypted_key+"'),fp.PostID,PostType,PostCategory, URL, CreatedAt, PostContent from ((select * from formpost limit 0,"+str(5+postNumber) + ") as fp join formcontent on(fp.PostID = formcontent.PostId))")  
	else:
		status_code = 2
		mycursor.execute("select aes_decrypt(Username,'"+decrypted_key+"'),fp.PostID,PostType,PostCategory, URL, CreatedAt, PostContent from ((select * from formpost limit " +str(postNumber)+","+str(5)+ ") as fp join formcontent on(fp.PostID = formcontent.PostId))")
	
	result = mycursor.fetchall()
	result.reverse()
	mycursor.close()
	return jsonify({'status':status_code, 'data':result}) ;
    
# main driver function 
if __name__ == '__main__':  
    app.run(host= '127.0.0.1' , port = '5003')