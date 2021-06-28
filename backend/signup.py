#We are using two levels of encryption. One is at db level and at data. In passwords,we are using md5(one-way)
#encryption and for mobile number, using aes encryption algorithm.
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
@app.route('/signup')  
def signup():
        req = request.get_json()
        username = req['username']
        name = req['name']
        password = req['password'] 
        email_id = req['email_id']
        branch = req['branch']
        mobile_number = req['mobile_number']
        mycursor = mysqldb.cursor()
        mycursor.execute("select count(*) from userinfo where usernmame = = aes_encrypt('"+username+"','"+decrypted_key+"')")
        username_exists = mycursor.fetchone()
        mycursor.execute("select count(*) from userinfo where password = md5('"+ password +"')")
        password_exists = mycursor.fetchone()
        if(username_exists[0] == 1  and password_exists[0] == 1):
           status_code = 0 # Both already exists so change them
        elif(username_exists[0] == 1  and password_exists[0] == 0):
           status_code = 1 # Username already exists
        elif(username_exists[0] == 0  and password_exists[0] == 1):
           status_code = 3 # password already exists
        else:
           mycursor.execute("insert into userinfo values (aes_encrypt('"+username+"','"+decrypted_key+"'),'"+name+"',md5('"+password+"'),'"+email_id+"','"+branch+"',aes_encrypt('"+mobile_number+"','"+decrypted_key+"'))")
           mysqldb.commit()
        #mycursor.execute("select cast(aes_decrypt(username,'"+decrypted_key+"') as char(100)) as Username,Email_Id,cast(aes_decrypt(Mobile_Number,'"+decrypted_key+"') as char(10)) as Mobile from userinfo ");
        #myresult = mycursor.fetchall()
        mycursor.close()
        return jsonify({'status':status_code})  
# main driver function 
if __name__ == '__main__':  
    app.run() 
