var express = require('express');
var router = express.Router();
var framework = require('../framework/location/clsLocation');

/* GET home page. */
router.get('/addDummy', function(req, res, next) {
    framework.clsLocation.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    framework.clsLocation.getAll(res);
});

router.get('/get/:id', function(req, res, next) {
    framework.clsLocation.getById(req.params.id, res, next);
});


router.delete('/delete/:id', function(req, res, next) {
    framework.clsLocation.deleteById(req.params.id, res, next);
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        framework.clsLocation.add(req.body, res, next);
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.put('/update/:id',function(req, res, next){
    try{
        console.log('In Update');
        console.log(req.body);
        framework.clsLocation.update(req.params.id, req.body, res, next);
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }

});

module.exports = router;



