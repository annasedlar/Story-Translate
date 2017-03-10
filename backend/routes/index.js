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
// var type = upload.single('videoToUpload');
var fs = require('fs');

router.post('/videos', upload.any(), function(req,res,next){
    console.log(req.body.familyName)
    var name = req.files[0].originalname;
    var tempPath = req.files[0].path
    var targetPath = 'public/videos/' + name
    var size = req.files[0].size
    var familyName = req.body.familyName
    var insertQuery = "INSERT INTO videos (name, path, size, familyName) VALUES (?,?,?,?)";
    connection.query(insertQuery, [name,targetPath,size,familyName], (DBerror, results, fields)=>{
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
    var familyId = req.body.id
    var familyName = req.body.familyName
    var insertQuery = "UPDATE videos SET familyName = ? WHERE id = ?";
    connection.query(insertQuery, [familyName, familyId], (DBerror, results, fields)=>{
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
    var familyId = req.params.id
    var transcriptString = JSON.stringify(req.body)
    // json.Parse
    var updateQuery = 'UPDATE videos SET transcript = ? WHERE id = ?';
    connection.query(updateQuery, [transcriptString, familyId], (DBerror, results, fields)=>{
        if(DBerror) throw DBerror; 
        res.json(results)
    })    
})
router.get('/transcript/:id', function(req,res,next){
    var selectQuery = 'SELECT transcript FROM videos where id = ?'
    // console.log(req.params.id)
    connection.query(selectQuery, [req.params.id], (DBerror, results, fields)=>{
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

