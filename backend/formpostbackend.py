from flask import Flask 
from flask import jsonify
from flask import request
from mysql.connector import Error
from mysql.connector import errorcode
from readkey import decrypted_key
from flask_cors import CORS
from readkey import user,decrypted_password
import mysql.connector
app = Flask("Pec Server") 
CORS(app)
@app.route('/formpostbackend' , methods=['POST', 'GET'])
def formpostbackend():
       req = request.get_json()
       username = req['username']
       posttype = req['type']
       category = req['category']
       url = req['url']
       message = req['message']
       if(url == None):
          url = 'abc'
       mysqldb = mysql.connector.connect(
       host="localhost",
       port="3303",
       user=user,
       password=decrypted_password,
       database="peccentral"
       )
       print("Database connection created successfully.")
       mycursor = mysqldb.cursor()
       args = [username,posttype,category,url,message]
       mycursor.callproc('insertpostdata',args)
       status_code = 2
       mycursor.close()           
       return jsonify({'status':2}) ;
    
# main driver function 
if __name__ == '__main__':  
    app.run(host= '127.0.0.1' , port = '5002')