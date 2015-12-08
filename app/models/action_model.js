var db = require('../../db.js');

/*
+---------------+--------------+------+-----+-------------------+----------------+
| Field         | Type         | Null | Key | Default           | Extra          |
+---------------+--------------+------+-----+-------------------+----------------+
| action_id     | int(11)      | NO   | PRI | NULL              | auto_increment |
| user_id       | int(11)      | NO   | MUL | NULL              |                |
| project_id    | int(11)      | YES  |     | NULL              |                |
| realm_id      | int(11)      | YES  |     | NULL              |                |
| contact_id    | int(11)      | YES  |     | NULL              |                |
| depends_on_id | int(11)      | YES  |     | NULL              |                |
| title         | varchar(200) | NO   |     | NULL              |                |
| is_complete   | tinyint(1)   | YES  |     | 0                 |                |
| status        | tinyint(1)   | YES  |     | 0                 |                |
| notes         | text         | YES  |     | NULL              |                |
| created       | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
+---------------+--------------+------+-----+-------------------+----------------+
*/

exports.insert = function(data, callback) {
	var sqlData = Array();
	sqlData[] = data.user_id || null;
	sqlData[] = data.project_id || null;
	sqlData[] = data.realm_id || null;
	sqlData[] = data.contact_id || null;
	sqlData[] = data.depends_on_id || null;
	sqlData[] = data.title || null;
	sqlData[] = data.is_complete || null;
	sqlData[] = data.status || null;
	sqlData[] = data.notes || null;

	var sql  = 'INSERT action (user_id, project_id, realm_id, contact_id, depends_on_id, title, is_complete, status, notes) ';
		sql += ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ';

	db.get(db.WRITE, function(err, connection) {
		connection.query(sql, sqlData, function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

exports.update = function(data, callback) {
	// var sqlData = Array();
	// sqlData[] = data.user_id || null;
	// sqlData[] = data.project_id || null;
	// sqlData[] = data.realm_id || null;
	// sqlData[] = data.contact_id || null;
	// sqlData[] = data.depends_on_id || null;
	// sqlData[] = data.title || null;
	// sqlData[] = data.is_complete || null;
	// sqlData[] = data.status || null;
	// sqlData[] = data.notes || null;

	// var sql  = 'UPDATE action (user_id, project_id, realm_id, contact_id, depends_on_id, title, is_complete, status, notes) ';
	// 	sql += ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ';

	// db.get(db.WRITE, function(err, connection) {
	// 	connection.query(sql, sqlData, function (err, result) {
	// 		connection.release();
	// 		if (err) return callback(err);

	// 		callback(err, result);
	// 	});
	// });
};

exports.delete = function(projectId, userId, callback) {
	var sql  = 'DELETE action WHERE action_id = ? AND user_id = ?';

	db.get(db.WRITE, function(err, connection) {
		connection.query(sql, [projectId, userId], function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

exports.getByProjectId = function(projectId, userId, callback) {
	var sql  = 'SELECT * FROM action WHERE project_id = ? AND user_id = ?';

	db.get(db.READ, function(err, connection) {
		connection.query(sql, [projectId, userId], function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

exports.getByRealmId = function(realmId, userId, callback) {
	var sql  = 'SELECT * FROM action WHERE realm_id = ? AND user_id = ?';

	db.get(db.READ, function(err, connection) {
		connection.query(sql, [realmId, userId], function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

exports.getByContactId = function(contactId, userId, callback) {
	var sql  = 'SELECT * FROM action WHERE contact_id = ? AND user_id = ?';

	db.get(db.READ, function(err, connection) {
		connection.query(sql, [contactId, userId], function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

exports.getByUserId = function(userId, userId, callback) {
	var sql  = 'SELECT * FROM action WHERE user_id = ? ';

	db.get(db.READ, function(err, connection) {
		connection.query(sql, [userId, userId], function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};


