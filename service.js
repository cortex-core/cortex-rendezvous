const express = require('express');
const ExampleResource = require('./src/resource/example-resource');
let example_resource = new ExampleResource(express);
let app = express();
 
app.use('/example', example_resource.register());
 
app.listen(8080, function() {
  console.log("API listening 8080")
});