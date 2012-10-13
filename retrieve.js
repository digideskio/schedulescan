var querystring = require('querystring'),
	http = require('http'),
	fs = require('fs'),
	cheerio = require('cheerio'),
	tidy = require('./htmltidy').tidy;

exports.retrieveData = function(term, classif, destination) {

	var data = querystring.stringify({
		  p_term: term,
		  p_classif: classif,
		  p_print_flag: "Y"
		});

	var options = {
		host: 'osoc.berkeley.edu',
		port: 80,
		path: '/OSOC/osoc',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length
		}
	};
	
	var trim = function(s) {
		return s.replace(/(\r\n|\n|\r)/gm," ")
				.replace(/\s+/g," ")
				.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'')
				.replace(/\s+/g,' ');
	}

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		var body = "";
		res.on('data', function(chunk) {
			body += chunk;
		});
		res.on('end', function() {
			tidy(body, function(err, html) {
				rows = [];
				//fs.writeFile("tidydata.txt", html, function(err) {});
				var $ = cheerio.load(html);
				var department = "";
				var k = 0;
				var c = 0;
				$("tr").each(function(i, row) {
					var cells = $(row).find("td");
					var n = cells.length;
					if ((cells.length == 1) || (c > 0)) {
						if (c == 0) {
							c = 4;
						} else if (c == 4) {
							department = trim($(cells).eq(0).text());
							c -= 1;
						} else {
							c -= 1;
						}
					} else if (cells.length == 5) {
						rows[k].note = trim($(cells).eq(4).text());
					} else if (cells.length == 11) {
						cells.each(function(j, cell) {
							var cell_text = trim($(cell).text());
							switch(j) {
								case 0:
									k += 1;
									rows[k] = {dept: department};
									break;
								case 1:
									rows[k].controlno = cell_text;
									break;
								case 2:
									rows[k].courseno = cell_text;
									break;
								case 3:
									rows[k].sectionno = cell_text;
									break;
								case 4:
									rows[k].time = cell_text;
									break;
								case 5:
									rows[k].room = cell_text;
									break;
								case 6:
									rows[k].title = cell_text;
									break;
								case 7:
									rows[k].units = cell_text;
									break;
								case 8:
									rows[k].instructor = cell_text;
									break;
								case 9:
									rows[k].examgroup = cell_text;
									break;
								case 10:
									rows[k].restrictions = cell_text;
									break;
								default:
									break;
							}
						});
					}
				});
				console.log(rows[k-17]);
				console.log("k is " + k);
			});
		});
	});

	req.write(data);
	req.end();
};