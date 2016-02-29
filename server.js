var connect = require('connect');
var connectRoute = require('connect-route');
var http = require('http');
var cors = require("cors");
var formidable = require('formidable');

var fs = require('fs');
var mkdirp = require('mkdirp');
var S = require('string');
var pako = require('pako');

var app = connect();

app.use(cors());

app.use(connectRoute(function (router) {
	router.get('/', function (req, res, next) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end('Hi!');  
	});

	router.post('/', function (req, res, next) {
		var form = new formidable.IncomingForm();

		form.parse(req, function(err, fields, files) {
			mkdirp('scenes', function(err) {
				// Convert from base64 string to binary string
				var input_data = new Buffer(fields.data, 'base64').toString('binary');
				// Decompress binary striing and parse into JSON object
				var json_data = JSON.parse(pako.inflate(input_data, { to: 'string' }));

				var name = S(json_data.name).slugify().s;
				
				fs.writeFile("scenes/" + name + ".bin", fields.data, function(err) {		
					if(err) {
						console.log(err);
					} else {
						console.log("The file " + name + ".bin" + " was saved!");
					}
				});
			});

			res.end();
		});
	});

	router.get('/view/:page', function (req, res, next) {
		fs.readdir("scenes/", function (err, files) {
			
			if (err) {
				res.writeHead(500);
				res.end();
				return;
			}

			res.writeHead(200, { 'Content-Type': 'application/json' });
			
			var binFiles = files.filter(function(file) {
				return file.match(/\.bin$/);
			});

			res.end(JSON.stringify(binFiles));
		});
	});

	router.get('/data/:file', function (req, res, next) {
		var path = "scenes/" + req.params.file;

		fs.readFile(path, function (err, data) {
			if (err) {
				res.writeHead(500);
				res.end();
				return;
			}
			
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end(data);
		});
		
	});
}));

http.createServer(app).listen(3000);

console.log('Listening on port 3000');