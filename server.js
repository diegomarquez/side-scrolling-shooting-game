var connect = require('connect');
var connectRoute = require('connect-route');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');

var fs = require('fs');
var mkdirp = require('mkdirp');
var S = require('string');

var app = connect();

app.use(cors());
app.use(bodyParser.json());

app.use(connectRoute(function (router) {
  router.get('/', function (req, res, next) {
  	res.writeHead(200, { 'Content-Type': 'text/html' });
  	res.end('Hi!');  
  });

  router.post('/', function (req, res, next) {
  	var body = '';

		req.on('data', function(data) {
			body += data;
		});

		req.on('end', function(data) {
			mkdirp('scenes', function(err) { 
				var json = JSON.parse(body);

				var name = S(json.name).slugify().s
	        fs.writeFile("scenes/" + name + ".json", JSON.stringify(json), function(err) {
			    
			    if(err) {
			        console.log(err);
			    } else {
			        console.log("The file was saved!");
			    }
				}); 
			});

	    res.end();
	  });
  });

  router.get('/scenes', function (req, res, next) {
  	fs.exists("scenes/", function () {
  		fs.readdir("scenes/", function (err, files) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify(files));
			});
  	}); 
  });

  router.get('/scenes/:file', function (req, res, next) {
  	var path = "scenes/" + req.params.file;

  	fs.exists(path, function () {
  		fs.readFile(path, function (err, data) {
  			res.writeHead(200, { 'Content-Type': 'text/plain' });
  			res.end(data);
  		});
  	});
  });
}));

http.createServer(app).listen(3000)

console.log('Listening on port 3000');
