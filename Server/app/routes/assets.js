// ASSET 

var express = require('express');
var router = express.Router();
var queueSwitch = require('../framework/common/queueSwitch');

var framework = require('../framework/asset/clsAsset' + queueSwitch.isQueueEnabled());

var clsAsset = framework.factory.getAssetInstance();

/* GET home page. */
router.get('/addDummy', function (req, res, next) {
    //TODO: To be Removed, Was only required while we dint had screen should be removed
    clsAsset.addDummy(res);
});

router.get('/getAll', function (req, res) {
    try {
        clsAsset.getAll().then(function (data) {
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
        clsAsset.getById(req.params.id).then(function (data) {
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
        clsAsset.deleteById(req.params.id).then(function (data) {
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
        console.log('In Add');
        console.log(req.body);
        clsAsset.add(req.body).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log(ex);
        res.json(statusError);
        res.end();
    }
});

router.put('/update/:id', function (req, res, next) {
    try {
        console.log('In Update');
        clsAsset.update(req.params.id, req.body).then(function (data) {
            res.json(data);
            res.end();
        });
    }
    catch (ex) {
        console.log(ex);
        res.json(statusError);
        res.end();
    }
});

router.get('/getByHierarchy/:id', function (req, res, next) {
    //res.json({name:'yes'});
    //res.end();
    try {
        clsAsset.getByHierarchyId(req.params.id).then(function (data) {
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

module.exports = router;
