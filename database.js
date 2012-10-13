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
	for(var i = 0; i < datarows.length; i++) {
        datarow = datarows[i];
		values = "('" + mysql_real_escape_string(datarow.dept) + ", " + 
                    mysql_real_escape_string(datarow.title) + ", " + 
                    mysql_real_escape_string(datarow.courseno) + ", " + 
                    mysql_real_escape_string(datarow.sectionno) + ", " + 
                    mysql_real_escape_string(datarow.controlno) + ", " + 
                    mysql_real_escape_string(datarow.time) + ", " + 
                    mysql_real_escape_string(datarow.room) + ", " + 
                    mysql_real_escape_string(datarow.units) + ", " + 
                    mysql_real_escape_string(datarow.instructor) +", " + 
                    mysql_real_escape_string(datarow.examgroup) + ", " + 
                    mysql_real_escape_string(datarow.restrictions) + ", " + 
                    mysql_real_escape_string(datarow.note) +"')";
		connection.query('INSERT INTO courses (dept, title, courseno, sectionno, controlno, time, room, units, instructor, examgroup, restrictions, note) VALUES ' + values, function(err, rows, fields) {
            if (err) throw err;
		});
	}
	connection.end();
};
exports.addorupdate = function(datarows) {
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
	for(var i = 0; i < datarows.length; i++) {
        datarow = datarows[i];
		connection.query('SELECT * FROM courses where controlno = '+datarow.controlno, function(err, rows, fields) {
			var olddata = true;
			if(rows.length != 0) { //update data
				values = " dept = " + mysql_real_escape_string(datarow.dept) + ", title = " + 
				    mysql_real_escape_string(datarow.title) + ", courseno = " + 
				    mysql_real_escape_string(datarow.courseno) + ", sectionno = " + 
				    mysql_real_escape_string(datarow.sectionno) + ", controlno = " + 
				    mysql_real_escape_string(datarow.controlno) + ", time = " + 
				    mysql_real_escape_string(datarow.time) + ", room = " + 
				    mysql_real_escape_string(datarow.room) + ", units = " + 
				    mysql_real_escape_string(datarow.units) + ", instructor = " + 
				    mysql_real_escape_string(datarow.instructor) +", examgroup = " + 
				    mysql_real_escape_string(datarow.examgroup) + ", restrictions = " + 
				    mysql_real_escape_string(datarow.restrictions) + ", note = " + 
				    mysql_real_escape_string(datarow.note);
				connection.query('UPDATE courses SET' + values+' where controlno = '+datarow.controlno, function(err, rows, fields) {
			    if (err) throw err;
				});
			}else{
				/**for(var j = 0; j < rows[0].length; j++) {
					switch(j)  {
					case 0:
						if(row[j] != datarow.dept) {
							olddata = false;
						}
						break;
					case 1:
						if(row[j] != datarow.title) {
							olddata = false;
						}
						break;
					case 2:
						if(row[j] != datarow.courseno) {
							olddata = false;
						}
						break;
					case 3:
						if(row[j] != datarow.sectionno) {
							olddata = false;
						}
						break;
					case 4:
						if(row[j] != datarow.controlno) {
							olddata = false;
						}
						break;
					case 5:
						if(row[j] != datarow.time) {
							olddata = false;
						}
						break;					
					case 6:
						if(row[j] != datarow.room) {
							olddata = false;
						}
						break;
					case 7:
						if(row[j] != datarow.units) {
							olddata = false;
						}
						break;
					case 8:
						if(row[j] != datarow.instructor) {
							olddata = false;
						}
						break;
					case 9:
						if(row[j] != datarow.examgroup) {
							olddata = false;
						}
						break;
					case 10:
						if(row[j] != datarow.restrictions) {
							olddata = false;
						}
						break;
					case 11:
						if(row[j] != datarow.note) {
							olddata = false;
						}
						break;
					}
				} **/
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
			});
		}
	}
	connection.end();
};
