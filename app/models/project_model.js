var db = require('../../db.js');

/*
+------------------+--------------+------+-----+-------------------+----------------+
| Field            | Type         | Null | Key | Default           | Extra          |
+------------------+--------------+------+-----+-------------------+----------------+
| project_id       | int(11)      | NO   | PRI | NULL              | auto_increment |
| subproject_of_id | int(11)      | YES  |     | NULL              |                |
| user_id          | int(11)      | NO   | MUL | NULL              |                |
| realm_id         | int(11)      | YES  |     | NULL              |                |
| status           | tinyint(1)   | YES  |     | 0                 |                |
| is_complete      | tinyint(1)   | YES  |     | 0                 |                |
| notes            | text         | YES  |     | NULL              |                |
| title            | varchar(200) | NO   |     | NULL              |                |
| created          | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
+------------------+--------------+------+-----+-------------------+----------------+
*/

exports.insert = function(data, callback) {
	var sqlData = Array();
	sqlData[] = data.subproject_of_id || null;
	sqlData[] = data.user_id || null;
	sqlData[] = data.realm_id || null;
	sqlData[] = data.status || null;
	sqlData[] = data.is_complete || null;
	sqlData[] = data.notes || null;
	sqlData[] = data.title || null;

	var sql  = 'INSERT project (subproject_of_id, user_id, realm_id, status, is_complete, notes, title) ';
		sql += ' VALUES (?, ?, ?, ?, ?, ?, ?) ';

	db.get(db.WRITE, function(err, connection) {
		connection.query(sql, sqlData, function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

exports.delete = function(projectId, userId, callback) {
	var sql  = 'DELETE project WHERE project_id = ? AND user_id = ?';

	db.get(db.WRITE, function(err, connection) {
		connection.query(sql, [projectId, userId], function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

exports.getByProjectId = function(projectId, userId, callback) {
	var sql  = 'SELECT * FROM project WHERE project_id = ? AND user_id = ?';

	db.get(db.READ, function(err, connection) {
		connection.query(sql, [projectId, userId], function (err, result) {
			connection.release();
			if (err) return callback(err);

			callback(err, result);
		});
	});
};

