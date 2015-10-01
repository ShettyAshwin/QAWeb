// ASSET 

var express = require('express');
var router = express.Router();
var framework = require('../framework/asset/clsAsset');

/* GET home page. */
router.get('/addDummy', function(req, res, next) {
    framework.clsAsset.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    console.log(framework);
	framework.clsAsset.getAll(res);
});

router.get('/get/:id', function(req, res, next) {
    framework.clsAsset.getById(req.params.id, res, next);
});

router.delete('/delete/:id', function(req, res, next) {
    framework.clsAsset.deleteById(req.params.id, res, next);
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        framework.clsAsset.add(req.body, res, next);
    }
    catch(ex){
        console.log(ex);
        res.json(statusError);
        res.end();
    }
});

router.put('/update/:id',function(req, res, next){
    try{
        console.log('In Update');
        console.log(req.body);
        framework.clsAsset.update(req.params.id, req.body, res, next);
    }
    catch(ex){
        console.log(ex);
        res.json(statusError);
        res.end();
    }

});

router.get('/getByHierarchy/:id', function(req, res, next) {
    //res.json({name:'yes'});
    //res.end();
    framework.clsAsset.getByHierarchyId(req.params.id, res, next);
});

module.exports = router;
