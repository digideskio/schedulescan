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

//adding data
exports.addtodb = function(datarows) {
	var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'password',
		  database : 'bclass',
	});
	//assume that the table is set up beforehand
	connection.connect();
	var datarow;
	var values;
    var k = 0;
	console.log('arr length is ', datarows.length);
	for(var i = 0; i < datarows.length; i++) {
        datarow = datarows[i];
		values = "('" + mysql_real_escape_string(datarow.dept) + "', '" + 
                    mysql_real_escape_string(datarow.title) + "', '" + 
                    mysql_real_escape_string(datarow.courseno) + "', '" + 
                    mysql_real_escape_string(datarow.sectionno) + "', '" + 
                    mysql_real_escape_string(datarow.controlno) + "', '" + 
                    mysql_real_escape_string(datarow.time) + "', '" + 
                    mysql_real_escape_string(datarow.room) + "', '" + 
                    mysql_real_escape_string(datarow.units) + "', '" + 
                    mysql_real_escape_string(datarow.instructor) +"', '" + 
                    mysql_real_escape_string(datarow.examgroup) + "', '" + 
                    mysql_real_escape_string(datarow.restrictions) + "', '" + 
                    mysql_real_escape_string(datarow.note) +"')";
		connection.query('INSERT INTO courses (dept, title, courseno, sectionno, controlno, time, room, units, instructor, examgroup, restrictions, note) VALUES ' + values, function(err, rows, fields) {
            if (err) throw err;
            console.log("iteration " + k);
            k += 1;
		});
	}
	connection.end();
	console.log('connection closed');
};
