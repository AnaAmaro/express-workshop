//Gestor de contenidos

var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');
var postfile = __dirname;

var app = express();

//vamos a borrar nuestras funciones de get y añadimos:

app.use(express.static('public'));

app.use(formidable());


app.get('/get-posts', function (req, res) {

 //var blogpost = req.fields.blogpost;

 fs.readFile(postfile + '/data/posts.json', function (error, file) {

  var posts = JSON.parse(file)
  res.send(JSON.stringify(posts));
 });
});

app.post('/create-post', function (req, res) {

 var blogpost = req.fields.blogpost;

 fs.readFile(postfile + '/data/posts.json', function (error, file) {

  var posts = JSON.parse(file)
  posts[Date.now()] = blogpost;

  fs.writeFile(postfile + '/data/posts.json', JSON.stringify(posts), function (error) {
   res.send('post añadido!!');
  });
 });
});

app.listen(3000, function () {
 console.log('Nuestro server esta OK en el puerto 3000');
});