var connect = require('connect');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');

var fs = require('fs');
var mkdirp = require('mkdirp');
var S = require('string');

var app = connect();

app.use(cors());
app.use(bodyParser.json());

app.use('/', function(req, res) {
	if(req.method == "POST") {
		// Store a scene
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
	} else {
		// Respond saying hi
	  res.writeHead(200, { 'Content-Type': 'text/html' });
	  res.end('I am here');  
	}	
});

http.createServer(app).listen(3000)

console.log('Listening on port 3000');

