var express = require('express');
var router = express.Router();
var framework = require('../framework/hospital/clsHospital');

/* GET home page. */
router.get('/addDummy', function(req, res, next) {
    framework.clsHospital.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    framework.clsHospital.getAll().then(function(data){
        res.json(data);
        res.end();
    });
});

router.get('/get/:id', function(req, res, next) {
    framework.clsHospital.getById(req.params.id).then(function(data){
        res.json(data);
        res.end();
    });
});

router.delete('/delete/:id', function(req, res, next) {
    framework.clsHospital.deleteById(req.params.id).then(function(data){
        res.json(data);
        res.end();
    });
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        framework.clsHospital.add(req.body).then(function(data){
            res.json(data);
            res.end();
        });
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
        framework.clsHospital.update(req.params.id, req.body).then(function(data){
            res.json(data);
            res.end();
        });
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }

});

router.get('/getTree', function(req, res, next) {
    try{
    framework.clsHospital.getTree().then(function(data){
        res.json(data);
        res.end();
    });
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

module.exports = router;
var express = require('express');
var router = express.Router();
var framework = require('../framework/hospital/clsHospital');

/* GET home page. */
router.get('/addDummy', function(req, res, next) {
    framework.clsHospital.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    framework.clsHospital.getAll().then(function(data){
        res.json(data);
        res.end();
    });
});

router.get('/get/:id', function(req, res, next) {
    framework.clsHospital.getById(req.params.id).then(function(data){
        res.json(data);
        res.end();
    });
});

router.delete('/delete/:id', function(req, res, next) {
    framework.clsHospital.deleteById(req.params.id).then(function(data){
        res.json(data);
        res.end();
    });
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        framework.clsHospital.add(req.body).then(function(data){
            res.json(data);
            res.end();
        });
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
        framework.clsHospital.update(req.params.id, req.body).then(function(data){
            res.json(data);
            res.end();
        });
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }

});

router.get('/getTree', function(req, res, next) {
    try{
    framework.clsHospital.getTree().then(function(data){
        res.json(data);
        res.end();
    });
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

module.exports = router;
var express = require('express');
var router = express.Router();
var framework = require('../framework/hospital/clsHospital');

/* GET home page. */
router.get('/addDummy', function(req, res, next) {
    framework.clsHospital.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    framework.clsHospital.getAll().then(function(data){
        res.json(data);
        res.end();
    });
});

router.get('/get/:id', function(req, res, next) {
    framework.clsHospital.getById(req.params.id).then(function(data){
        res.json(data);
        res.end();
    });
});

router.delete('/delete/:id', function(req, res, next) {
    framework.clsHospital.deleteById(req.params.id).then(function(data){
        res.json(data);
        res.end();
    });
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        framework.clsHospital.add(req.body).then(function(data){
            res.json(data);
            res.end();
        });
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
        framework.clsHospital.update(req.params.id, req.body).then(function(data){
            res.json(data);
            res.end();
        });
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }

});

router.get('/getTree', function(req, res, next) {
    try{
    framework.clsHospital.getTree().then(function(data){
        res.json(data);
        res.end();
    });
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

module.exports = router;
var express = require('express');
var router = express.Router();
var framework = require('../framework/hospital/clsHospital');

/* GET home page. */
router.get('/addDummy', function(req, res, next) {
    framework.clsHospital.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    framework.clsHospital.getAll().then(function(data){
        res.json(data);
        res.end();
    });
});

router.get('/get/:id', function(req, res, next) {
    framework.clsHospital.getById(req.params.id).then(function(data){
        res.json(data);
        res.end();
    });
});

router.delete('/delete/:id', function(req, res, next) {
    framework.clsHospital.deleteById(req.params.id).then(function(data){
        res.json(data);
        res.end();
    });
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        framework.clsHospital.add(req.body).then(function(data){
            res.json(data);
            res.end();
        });
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
        framework.clsHospital.update(req.params.id, req.body).then(function(data){
            res.json(data);
            res.end();
        });
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }

});

router.get('/getTree', function(req, res, next) {
    try{
        framework.clsHospital.getTree().then(function(data){
        res.json(data);
        res.end();
    });
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.get('/getTreeById/:id', function(req, res, next) {
    try{
        framework.clsHospital.getTree(req.params.id).then(function(data){
            res.json(data);
            res.end();
        });
    }
    catch(ex){
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});
module.exports = router;
