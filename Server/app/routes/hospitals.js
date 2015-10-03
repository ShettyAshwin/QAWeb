var express = require('express');
var router = express.Router();
var framework = require('../framework/hospital/clsHospital');

var clsHospital = framework.factory.getHospitalInstance();

/* GET home page. */
router.get('/addDummy', function (req, res, next) {
    //TODO: To be Removed, Was only required while we dint had screen should be removed
    clsHospital.addDummy(res);
});

router.get('/getAll', function (req, res, next) {
    clsHospital.getAll().then(function (data) {
        res.json(data);
        res.end();
    });
});

router.get('/get/:id', function (req, res, next) {
    try {
        clsHospital.getById(req.params.id).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.delete('/delete/:id', function (req, res, next) {
    try {
        clsHospital.deleteById(req.params.id).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.post('/add', function (req, res, next) {
    try {
        console.log('In Add');
        console.log(req.body);
        clsHospital.add(req.body).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.put('/update/:id', function (req, res, next) {
    try {
        console.log('In Update');
        console.log(req.body);
        clsHospital.update(req.params.id, req.body).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }

});

router.get('/getTree', function (req, res, next) {
    try {
        clsHospital.getTree().then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

module.exports = router;
