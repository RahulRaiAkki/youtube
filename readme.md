1. Front-end code is in the php folder.Run that code on any server like apache.
2. Backend code is in written in node js and can be run directly using node app.js.
3. Change mysql connection credentials in app.js file. 

Create a database name youtube and two tables channels and videos 
Query :

CREATE TABLE `channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_id` varchar(99) DEFAULT NULL,
  `snippet` mediumtext DEFAULT NULL,
  `stats` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `channel_id_UNIQUE` (`channel_id`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `videos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `youtube_id` varchar(99) DEFAULT NULL,
  `etag` varchar(99) DEFAULT NULL,
  `title` varchar(99) DEFAULT NULL,
  `snippet` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `channel_id` varchar(999) DEFAULT NULL,
  `stats` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_UNIQUE` (`youtube_id`) USING HASH,
  UNIQUE KEY `etag_UNIQUE` (`etag`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


3. Detailed step. install nodejs and npm, clone the repository in system, then run npm install in the youtube folder. it will download all the dependencies needed in the project.
4.After that run **node app.js** command it will run the code on the local machine at 3000 port 
5. Final Step run the php folder on server.

working demo link is http://3.133.134.71/

 