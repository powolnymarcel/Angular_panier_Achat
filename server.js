'use strict'
//On exige  express et on crée une app.
var express = require('express');

var app = express();


//définis les chemins /public et /node_modules.
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));



app.get('/',function(req,res){
	res.sendFile('main.html',{'root':__dirname + '/public'});
})

//Ensuite, lie l'application à un port d'adresse local.

app.listen('3000',function(){
	console.log('Server running at http://localhost:3000 !!')
});

