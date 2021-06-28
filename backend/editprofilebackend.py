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
@app.route('/deletePost' , methods=['POST', 'GET'])
def deletePost():
	req = request.get_json()
	postId = req['postId']
	mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )
	mycursor = mysqldb.cursor()
	mycursor.execute("delete from formcontent where PostId =" + postId)
	mycursor.execute("delete from formpost where PostId =" + postId)
	mysqldb.commit()
	mycursor.close()
	return jsonify({'status':1}) ;


@app.route('/unfavPost' , methods=['POST', 'GET'])
def unfavPost():
	req = request.get_json()
	postId = req['postId']
	username = req['username']
	mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )
	mycursor = mysqldb.cursor()
	mycursor.execute("select favourite from userinfo where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
	result = mycursor.fetchone()
	fav = result[0]
	if(fav == None):
		fav=str(postId)
	else:
		list = fav.split(",")
		fav = ""
		for x in list:
			if(x!=str(postId)):
				if(fav==""):
					fav=x
				else:
					fav=fav+","+x;
	if(fav == ""):
		mycursor.execute("update userinfo set favourite = NULL where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
	else:
		mycursor.execute("update userinfo set favourite = '"+fav+"' where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
	mysqldb.commit()
	mycursor.close()
	return jsonify({'status':1}) ;
	

@app.route('/updateProfilePicture' , methods=['POST', 'GET'])
def updateProfilePicture():
	req = request.get_json()
	profileImage = req['imageUrl']
	username = req['username']
	mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )
	mycursor = mysqldb.cursor()
	mycursor.execute("update userinfo set profile_image = '"+profileImage+"' where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
	mysqldb.commit()
	mycursor.close()
	return jsonify({'status':1}) ;


@app.route('/addToFav' , methods=['POST', 'GET'])
def addToFav():
	req = request.get_json()
	postId = req['postId']
	username = req['username']
	mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )
	mycursor = mysqldb.cursor()
	mycursor.execute("select favourite from userinfo where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
	result = mycursor.fetchone()
	fav = result[0]
	if(fav == None):
		fav=str(postId)
	else:
		list = fav.split(",")
		flag = True
		for x in list:
			if(x==str(postId)):
				flag=False
				break
		if(flag):
			fav = fav + "," + str(postId)
	print(fav)
	mycursor.execute("update userinfo set favourite = '"+fav+"' where username = aes_encrypt('"+username+"','"+decrypted_key+"')")
	mysqldb.commit()
	mycursor.close()
	return jsonify({'status':1}) ;
	
@app.route('/myPosts' , methods=['POST', 'GET'])
def myposts():
	req = request.get_json()
	username = req['username']
	pageStatus = req['pageStatus']
	mysqldb = mysql.connector.connect(
    host="localhost",
    port="3303",
    user=user,
    password=decrypted_password,
    database="peccentral"
    )

	mycursor = mysqldb.cursor()
	mycursor.execute("select count(*) from formpost where username = aes_encrypt('" +username+ "','birbal');" )
	result = mycursor.fetchone()
	postNumber = result[0] - pageStatus - 5
	
	if(result[0]-pageStatus <= 0):
		mycursor.close()
		return jsonify({'status':'1', 'data':''}) ;
	elif(postNumber < 0):
		status_code = 1
		mycursor.execute("select aes_decrypt(Username,'"+decrypted_key+"'),fp.PostID,PostType,PostCategory, URL, CreatedAt, PostContent from ((select * from formpost where username = aes_encrypt('"+username+"','birbal') limit 0,"+str(5+postNumber) + ") as fp join formcontent on(fp.PostID = formcontent.PostId))")  
	else:
		status_code = 2
		mycursor.execute("select aes_decrypt(Username,'"+decrypted_key+"'),fp.PostID,PostType,PostCategory, URL, CreatedAt, PostContent from ((select * from formpost where username = aes_encrypt('"+username+"','birbal') limit " +str(postNumber)+","+str(5)+ ") as fp join formcontent on(fp.PostID = formcontent.PostId))")
	
	result = mycursor.fetchall()
	result.reverse()
	mycursor.close()
	return jsonify({'status':status_code, 'data':result}) ;

@app.route('/favPosts' , methods=['POST', 'GET'])
def favPosts():
	req = request.get_json()
	username = req['username']
	pageStatus = req['pageStatus']
	mysqldb = mysql.connector.connect(
	host="localhost",
	port="3303",
	user=user,
	password=decrypted_password,
	database="peccentral"
	)
	mycursor = mysqldb.cursor()
	mycursor.execute("select favourite from userinfo where username = aes_encrypt('"+username+"','birbal')")
	result = mycursor.fetchone()
	if(result[0] == None):
		return jsonify({'status':1,'data':''})
	list = result[0].split(',')
	li =[]
	for i in list:
		li.append(int(i))
	if(len(li) - pageStatus <= 0):
		mycursor.close()
		return jsonify({'status':1,'data':''})
	index = pageStatus
	count =0
	posts = []
	while index<len(li) and count <5:
		s = li[index]
		mycursor.execute("select aes_decrypt(formpost.Username,'"+decrypted_key+"'),formpost.PostID ,PostType,PostCategory,URL,CreatedAt,PostContent from formpost,formcontent where formpost.PostID = %s and formpost.PostID = formcontent.PostID",(li[index],))
		result = mycursor.fetchone()
		#print(result)
		posts.append(result)
		index =index + 1
		count = count + 1
	return jsonify({'status':2,'data':posts})
	
# main driver function 
if __name__ == '__main__':  
    app.run(host= '127.0.0.1' , port = '5006')