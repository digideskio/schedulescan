var mysql = require('mysql');

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
        }
    });
}

//querying
exports.querydb = function(inputrow, callback) {
	var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'hackathon',
		  password : 'password',
		  database : 'bclass',
	});
	connection.connect();
	var values = '';
	if (typeof(inputrow.dept) != null && inputrow.dept != undefined) {
		values += ' dept = "' + mysql_real_escape_string(inputrow.dept) + '"';
	}
	if (typeof(inputrow.title) != null && inputrow.title != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' title = "'+ mysql_real_escape_string(inputrow.title) +'"';
	}
	if (typeof(inputrow.dept) != null && inputrow.dept != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' courseno = "'+ mysql_real_escape_string(inputrow.dept) +'"';
	}
	if (typeof(inputrow.sectionno) != null && inputrow.sectionno != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' sectionno = "'+ mysql_real_escape_string(inputrow.sectionno) +'"';
	}
	if (typeof(inputrow.controlno) != null && inputrow.controlno != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' controlno = "'+ mysql_real_escape_string(inputrow.controlno)+'"';
	}
	if (typeof(inputrow.time) != null && inputrow.time != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' time = "'+ mysql_real_escape_string(inputrow.time) +'"';
	}
	if (typeof(inputrow.room) != null && inputrow.room != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' room = "'+ mysql_real_escape_string(inputrow.room) +'"';
	}
	if (typeof(inputrow.units) != null && inputrow.units != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' units = "'+ mysql_real_escape_string(inputrow.units) +'"';
	}
	if (typeof(inputrow.instructor) != null && inputrow.instructor != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' instructor = "'+ mysql_real_escape_string(inputrow.instructor) +'"';
	}
	if (typeof(inputrow.examgroup) != null && inputrow.examgroup != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' examgroup = "'+ mysql_real_escape_string(inputrow.examgroup) +'"';
	}
	if (typeof(inputrow.restrictions) != null && inputrow.restrictions != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' restrictions = "'+ mysql_real_escape_string(inputrow.restrictions) +'"';
	}
	if (typeof(inputrow.note) != null && inputrow.note != undefined) {
		if(values != '') {
			values += ' AND';
		}
		values += ' note = "'+ mysql_real_escape_string(inputrow.note) +'"';
	}
	values+=';';
	
	connection.query('SELECT * FROM courses WHERE'+ values, function(err, rows, fields) {
		if (err) throw err;
        callback(rows);
	});
	
	connection.end();
};