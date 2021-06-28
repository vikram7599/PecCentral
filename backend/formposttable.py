#Decoupled the content of the body from main formpost table because content requires large space so
#using text that can store upto 64KB size and it's stored on the disk rather on DB server memory,
# so using another table in order to have fast access to formpost table.
from connection import mysqldb
from mysql.connector import Error
from mysql.connector import errorcode
mycursor = mysqldb.cursor()
print("Creating table")

#mycursor.execute("CREATE TABLE userinfo (\
#username varbinary(255) primary key,\
#name varchar(100) not null,\
#password varchar(50) not null unique,\
#email_id varchar(100) not null unique,\
#branch varchar(50) not null,\
#mobile_number varbinary(255) not null unique)")

#mycursor.execute("CREATE TABLE formpost (PostID int(20) unsigned not null unique auto_increment , Username \
#varbinary(255) not null, PostType varchar(50) not null , PostCategory varchar(50) not \
#null, Url varchar(255), CreatedAt datetime default now() )")

#mycursor.execute("ALTER TABLE formpost \
#ADD FOREIGN KEY (Username) REFERENCES userinfo(Username);")

#mycursor.execute("create table formcontent (PostID int(20) unsigned not null unique \
#, PostContent text not null , FOREIGN KEY (PostID) REFERENCES formpost(PostID))")

#Call insertpostdata("abc","blog","wd","www.pec","hello,this is first post.");

#CREATE PROCEDURE `InsertPostData`(
#Username VARBINARY(255),
#PostType VARCHAR(50),
#PostCategory VARCHAR(50),
#URL VARCHAR(255),
#PostContent text
#)
#BEGIN
 #  DECLARE PostID INT DEFAULT 0;
  # START TRANSACTION;
   #INSERT INTO formpost(Username,PostType, PostCategory, URL)
   #VALUES(aes_encrypt(Username,'birbal'),PostType, PostCategory, URL);
   #SET PostID = LAST_INSERT_ID();
   #IF PostID > 0 THEN
    #  INSERT INTO formcontent(PostID,PostContent)
     # VALUES(PostID,PostContent);
      #COMMIT;
  # ELSE
   #   ROLLBACK;
   #END IF;
#End;

#problem may come in foreign key constraints due to encryption not used in one of the table but used in other.