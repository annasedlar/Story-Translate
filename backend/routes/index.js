var express = require('express');
var router = express.Router();
var config = require('../config');
var mysql = require('mysql'); 
var randtoken = require('rand-token');
var token = randtoken.uid(40);

var connection = mysql.createConnection({
    host: config.host, 
    user: config.user, 
    password: config.password, 
    database: config.database
});
connection.connect();

var multer = require('multer'); 
var upload = multer({ dest: 'public/videos' });
// var type = upload.single('videoToUpload');
var fs = require('fs');

router.post('/videos', upload.any(), function(req,res,next){
    console.log(req.files[0])
    var name = req.files[0].originalname;
    var tempPath = req.files[0].path
    var targetPath = 'public/videos/' + name
    var size = req.files[0].size
    var familyName = req.body.familyName
    var token = randtoken.uid(40);
    var insertQuery = "INSERT INTO videos (name, path, size, familyName, token) VALUES (?,?,?,?,?)";
    connection.query(insertQuery, [name,targetPath,size,familyName,token], (DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json("uploaded succesfully"); 
        fs.readFile(tempPath, (readError, readContents)=>{
            if(readError) throw readError; 
            fs.writeFile(targetPath,readContents, (writeError)=>{
                if(writeError) throw writeError; 
                fs.unlink(tempPath, (err)=>{
                    if(err) throw err
                })
            })
        })
    })
})

router.post('/changeFamilyName', function(req,res,next){
    console.log(req.body.familyName)
    console.log(req.body.id)
    var token = req.body.token
    var familyName = req.body.familyName
    var insertQuery = "UPDATE videos SET familyName = ? WHERE token = ?";
    connection.query(insertQuery, [familyName, token], (DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json("uploaded succesfully"); 
    })
})



router.get('/test', function(req,res,next){
	res.json('test')

})
router.post('/thumbnails', upload.any(), function(req,res,next){
    // console.log(req.body)
    // console.log(req.file.path)
    // console.log('asdfasdfasdfasdfasdfasdf')
    // var name = req.files[0].originalname;
    // var tempPath = req.files[0].path
    // var targetPath = 'public/videos/' + name
    // var size = req.files[0].size
    // var insertQuery = "INSERT INTO videos (name, path, size) VALUES (?,?,?)";
    // connection.query(insertQuery, [name,targetPath,size], (DBerror, results, fields)=>{
    //     if(DBerror) throw DBerror; 
    //     res.json("uploaded succesfully"); 
    //     fs.readFile(tempPath, (readError, readContents)=>{
    //         if(readError) throw readError; 
    //         fs.writeFile(targetPath,readContents, (writeError)=>{
    //             if(writeError) throw writeError; 
    //             fs.unlink(tempPath, (err)=>{
    //                 if(err) throw err
    //             })
    //         })
    //     })
    // })
})
// var transcript = {}
router.post('/transcript/:id', function(req,res,next){
    var token = req.params.id
    var transcriptString = JSON.stringify(req.body)
    // json.Parse
    var updateQuery = 'UPDATE videos SET transcript = ? WHERE token = ?';
    connection.query(updateQuery, [transcriptString, token], (DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json(results)
    })
})

router.post('/finished/:id', function(req,res,next){
    var token = req.params.id
    var updateQuery = 'UPDATE videos SET finished = ? WHERE token = ?';
    connection.query(updateQuery, [1, token], (DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json(results)
    })    
})

router.get('/transcript/:id', function(req,res,next){
    var selectQuery = 'SELECT transcript FROM videos where token = ?'
    // console.log(req.params.id)
    connection.query(selectQuery, [req.params.id], (DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json(results)
    })  
})  
router.get('/videos', function(req,res,next){
    var selectQuery = 'SELECT * FROM videos'
    connection.query(selectQuery,(DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json(results)
    })
})
router.get('/videosToTranslate', function(req,res,next){
    var selectQuery = 'SELECT * FROM videos WHERE finished = 0'
    connection.query(selectQuery,(DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json(results)
    })
})
router.get('/videosFinished', function(req,res,next){
    var selectQuery = 'SELECT * FROM videos WHERE finished = 1'
    connection.query(selectQuery,(DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json(results)
    })
})

router.get('/videosByFamilyName/:id', function(req,res,next){
    var selectQuery = 'SELECT * FROM videos WHERE familyName = ?'
    var familyName = req.params.id
    connection.query(selectQuery, [familyName],(DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json(results)
    })
})
module.exports = router;

