from flask import Flask 
from flask import jsonify
from flask import request
from connection import mysqldb
from mysql.connector import Error
from mysql.connector import errorcode
from readkey import decrypted_key
from flask_cors import CORS
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
       if(len(url) == 0):
          url = None
       mycursor = mysqldb.cursor()
       mycursor.execute("select count(*) from userinfo where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
       result = mycursor.fetchone()
       if(result[0] == 0):
          status_code = 1 
       else:
          args = [username,posttype,category,url,message]
          mycursor.callproc('insertpostdata',args)
          status_code = 2
       mycursor.close()           
       return jsonify({'status':status_code}) ;
    
# main driver function 
if __name__ == '__main__':  
    app.run(host= '127.0.0.1' , port = '5002')