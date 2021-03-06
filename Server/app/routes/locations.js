var express = require('express');
var router = express.Router();
var queueSwitch = require('../framework/common/queueSwitch');

var framework = require('../framework/location/clsLocation' + queueSwitch.isQueueEnabled());

var clsLocation = framework.factory.getLocationInstance();

/* GET home page. */
router.get('/addDummy', function (req, res, next) {
    //TODO: To be Removed, Was only required while we dint had screen should be removed
    clsLocation.addDummy(res);
});

router.get('/getAll', function (req, res, next) {
    try {
        clsLocation.getAll().then(function (data) {
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

router.get('/get/:id', function (req, res, next) {
    try {
        clsLocation.getById(req.params.id).then(function (data) {
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

router.get('/getByHospital/:id', function (req, res, next) {
    try {
        clsLocation.getByHospitalId(req.params.id).then(function (data) {
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
        clsLocation.deleteById(req.params.id).then(function (data) {
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
        clsLocation.add(req.body).then(function (data) {
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
        clsLocation.update(req.params.id).then(function (data) {
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



