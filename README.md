Instalation

$ npm install --production


Database:

 * create a action database user
 	$ mysql -uroot -proot -h<IP TO MYSQL DATABASE>
		GRANT ALL ON action.* TO 'action'@'%' IDENTIFIED BY 'action';
		GRANT ALL ON action.* TO 'action'@'localhost' IDENTIFIED BY 'action';
		FLUSH PRIVILEGES;

 * Create the main database (new server instance only)
		CREATE DATABASE action;

 * Update to the latest database schema (after every deployment)
    Example:
    $ cd db=patch
    $ sh ./patch-db.sh -uaction -paction -daction
