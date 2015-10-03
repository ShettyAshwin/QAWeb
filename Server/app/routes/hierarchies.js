var express = require('express');
var router = express.Router();
var queueSwitch = require('../framework/common/queueSwitch');

var framework = require('../framework/Hierarchies/clsHierarchies' + queueSwitch.isQueueEnabled());

var clsHierarchy = framework.factory.getHierarchyInstance();

router.get('/addDummy', function (req, res, next) {
    //TODO: To be Removed, Was only required while we dint had screen should be removed
    clsHierarchy.addDummy(res);
});

router.get('/getAll', function (req, res, next) {
    try {
        clsHierarchy.getAll().then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log('In error');
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.get('/get/:id', function (req, res, next) {
    try {
        clsHierarchy.getById(req.params.id).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log('In error');
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.get('/getByLocation/:id', function (req, res, next) {
    try {
        clsHierarchy.getByLocationId(req.params.id).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log('In error');
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.delete('/delete/:id', function (req, res, next) {
    try {
        clsHierarchy.deleteById(req.params.id).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log('In error');
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.post('/add', function (req, res, next) {
    try {
        console.log('In Add 123');
        console.log(req.body);
        clsHierarchy.add(req.body).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log('In error');
        console.log(ex);
        res.json(framework.statusError);
        res.end();
    }
});

router.put('/update/:id', function (req, res, next) {
    try {
        console.log('In Update');
        console.log(req.body);
        clsHierarchy.update(req.params.id, req.body).then(function (data) {
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
