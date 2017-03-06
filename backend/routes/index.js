var express = require('express');
var router = express.Router();
var config = require('../config');
var mysql = require('mysql'); 
var connection = mysql.createConnection({
	host: config.host, 
	user: config.user, 
	password: config.password, 
	database: config.database
});
connection.connect();

var multer = require('multer'); 
var upload = multer({ dest: 'public/videos' });
var type = upload.single('videoToUpload');
var fs = require('fs'); 

router.post('/products', upload.any(), function(req,res,next){
	
})
// router.post('/videos', type, (req, res, next)=>{
// 	console.log(req)
// 	// res.json(req.files);
// 	// console.log(req.files)
// 	// if(req.files){
// 	// 	req.files.forEach(function(file){
// 	// 		console.log(file)
// 	// 		fs.rename(file.path, 'public/videos/' + file.originalname, function(err){
// 	// 			if (err) throw err

// 	// 		})
// 	// 	})
// 	// }

// 	// //temorarily save the path where the file is at
// 	// var tempPath = req.file.path;
// 	// //set up target Path and original file name
// 	// var targetPath = 'public/videos/'+ req.file.originalname;
// 	// //use fs module to read the file then write it to the correct place
// 	// fs.readFile(tempPath, (error, fileContents)=>{
// 	// 	//takes three arguments: where, what, callback
// 	// 	fs.writeFile(targetPath, fileContents, (error)=>{
// 	// 		if (error) throw error; 
// 	// 		var insertQuery = "INSERT INTO videos (videoUrl) VALUE (?)";
// 	// 		connection.query(insertQuery, [req.file.originalname], (DBerror, results, fields)=>{
// 	// 			if(DBerror) throw error; 
// 	// 			res.redirect('/')
// 	// 		})
// 	// 		// res.json("uploaded succesfully"); 
// 	// 	})
// 	// }); 

// })













// // router.get('/videos', function(req, res, next) {
// // 	var getVideosQuery = 'SELECT * FROM videos' 
// // 	connection.query(getVideosQuery, (error, results, fields) =>{
// // 		res.json(results)
// // 	})
// // });














module.exports = router;
