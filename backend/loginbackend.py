from flask import Flask 
from flask import jsonify
from flask import request
from connection import mysqldb
from mysql.connector import Error
from mysql.connector import errorcode
from readkey import decrypted_key
from flask_cors import CORS
from flask_mail import Mail, Message
from generatepassword import generate_password
from macaddress import mac_address
import secrets
app = Flask("Pec Server") 
CORS(app)
@app.route('/login' , methods=['POST', 'GET'])
def login():
       req = request.get_json()
       token = ''
       username = req['username']
       password = req['password']
       mycursor = mysqldb.cursor()
       mycursor.execute("select cast(aes_decrypt(username,'"+decrypted_key+"') as char(100)) as Username from userinfo where password = md5('"+ password + "')")
       username_exists = mycursor.fetchone()
       print(username_exists)
       if((username_exists == None) or (username_exists != None and username_exists[0] != username)):
          status_code = 0
       else:
          status_code = 1
          token = secrets.token_urlsafe()
          mycursor.execute("select count(*) from ads where username = aes_encrypt('" +username+ "','birbal');")
          username_exists = mycursor.fetchone()
          if(username_exists[0] > 0):
             mycursor.execute("delete from ads where username = aes_encrypt('"+username+"','birbal');")
             mysqldb.commit()
          mycursor.execute("insert into ads(username,token,mac_address) values (aes_encrypt('"+username+"','"+decrypted_key+"'),'"+token+"','"+mac_address+"')")
          mysqldb.commit()
          print(token)
       mycursor.close()
       return jsonify({'status':status_code,'token':token});

@app.route('/resetpassword' , methods=['POST', 'GET'])
def resetpassword():
       req = request.get_json()
       username = req['username']
       oldpassword = req['oldpassword']
       newpassword = req['newpassword']
       mycursor = mysqldb.cursor()
       mycursor.execute("select cast(aes_decrypt(username,'"+decrypted_key+"') as char(100)) as Username from userinfo where password = md5('"+ oldpassword + "')")
       username_exists = mycursor.fetchone()
       print(username_exists)
       mycursor.execute("select count(*) from userinfo where password = md5('"+ newpassword + "')")
       newpassword_exists = mycursor.fetchone()
       print(newpassword_exists[0])
       if((username_exists == None) or (username_exists != None and username_exists[0] != username)):
          if(newpassword_exists[0] == 1):
             status_code = 0
          else:
             status_code = 1
       elif(newpassword_exists[0] == 1):
             status_code = 2
       else:
          status_code = 3
          mycursor.execute("update userinfo set password = md5('"+ newpassword + "') where password = md5('"+ oldpassword +"')")
          mysqldb.commit()
       mycursor.close()
       return jsonify({'status':status_code});

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = "peccentral1921@gmail.com"
app.config['MAIL_PASSWORD'] = "#peccentral1921"
mail = Mail(app)
@app.route('/forgotpassword' , methods=['POST', 'GET'])
def forgotpassword():
    req = request.get_json()
    username = req['username']
    print(type(username))
    email_id = req['email']
    mycursor = mysqldb.cursor()
    mycursor.execute("select name from userinfo where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
    name_exists = mycursor.fetchone()
    print(name_exists)
    msg = Message("Hello",
        sender=("PecCentral no-reply", "my_username@gmail.com"),
        recipients=[email_id],
        body= " Hello " + name_exists[0] + ",\n"+"This is system generated password - " + generate_password +"\n"+"Please reset your password by using current password mentioned here.")
    mail.send(msg)
    mycursor.execute("update userinfo set password = md5('"+ generate_password + "') where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
    mysqldb.commit()
    mycursor.close()
    # message sent confirmation
    return jsonify({'status':1})


# main driver function 
if __name__ == '__main__':  
    app.run(host= '127.0.0.1' , port = '5000') 