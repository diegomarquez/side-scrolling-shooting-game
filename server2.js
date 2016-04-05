var express = require('express');
var cors = require('cors')

var app = express();

app.use(cors());
app.use(express.static(__dirname));

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});