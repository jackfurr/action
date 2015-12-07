var db = require('../../db.js');
var crypto = require('crypto');

/*
+----------+--------------+------+-----+-------------------+----------------+
| Field    | Type         | Null | Key | Default           | Extra          |
+----------+--------------+------+-----+-------------------+----------------+
| user_id  | int(11)      | NO   | PRI | NULL              | auto_increment |
| email    | varchar(200) | NO   |     | NULL              |                |
| password | varchar(255) | NO   |     | NULL              |                |
| created  | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
+----------+--------------+------+-----+-------------------+----------------+
*/

exports.encryptPassword = function(password, email) {
    if (!password) {
        logger.warn('Password was empty');
        return '';
    }

    var salt  = 'aldfjkghas;ldfjkhqer;giuy3ro;gklvbserut;aozsilxfguuweh;oewhjf';
        salt += 'zslkdjhewfkxjd*gkfjgheorghekjfgvzxck.jcwkebhvo;skjerg3y8wuekj';
        salt += 'r34242iufy9y<p2iuhaskzjdbvapegyep29f45634otjn3kn;dnzcxvi34wtf';
        salt += email;

    var encyprtedPassword = '';
    try {
        encyprtedPassword = crypto.createHmac('sha256', salt)
                                    .update(password)
                                    .digest('hex');
    } catch (err) {
        return encyprtedPassword;
    }

    return encyprtedPassword;
};

exports.insert = function(email, password, callback) {
	var sql  = 'INSERT user (email, password) ';
		sql += ' VALUES (?, ?) ';

	var passwordHash = this.encryptPassword(password, email);

	db.get(db.WRITE, function(err, connection) {
		connection.query(sql, [email, passwordHash], function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

exports.delete = function(userId, callback) {
	var sql  = 'DELETE user WHERE user_id = ?';

	db.get(db.WRITE, function(err, connection) {
		connection.query(sql, userId, function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

exports.getByUserId = function(userId, callback) {
	var sql  = 'SELECT * FROM user WHERE user_id = ?';

	db.get(db.READ, function(err, connection) {
		connection.query(sql, userId, function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result[0]);
		});
	});
};

exports.authenticate = function(email, password, callback) {
	var sql = 'SELECT user_id, email FROM user WHERE email=? AND password=?';
	var passwordHash = this.encryptPassword(password, email);
	db.get(db.READ, function(err, connection) {
		connection.query(sql, [email, passwordHash], function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result[0]);
		});
	});
};
