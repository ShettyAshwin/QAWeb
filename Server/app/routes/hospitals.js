var express = require('express');
var router = express.Router();
var framework = require('../framework/hospital/clsHospital');

/* GET home page. */
router.get('/addDummy', function(req, res, next) {
    framework.clsHospital.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    framework.clsHospital.getAll(res);
});

router.get('/get/:id', function(req, res, next) {
    framework.clsHospital.getById(req.params.id, res, next);
});

router.delete('/delete/:id', function(req, res, next) {
    framework.clsHospital.deleteById(req.params.id, res, next);
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        framework.clsHospital.add(req.body, res, next);
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
        clsHospital.update(req.params.id, req.body, res, next);
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }

});
module.exports = router;
