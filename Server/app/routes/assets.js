// ASSET 

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var assetSchema = new mongoose.Schema({name: String, properties: [{name : String, value:String}], association : String});
var assetModel = mongoose.model('asset', assetSchema);

var dbServer = 'mongodb://localhost:27017/QAWeb';
var statusOk = {status:'ok', detail :''};
var statusError =  {status :'500', detail :''};


mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbServer);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


// CLASS
var clsasset  = {
    connectDB : function(){
        mongoose.connect(dbServer,function(error){
            if(error){
                console.log(error);
            }
        });
    },
    disconnectDB :function(){

    },
    responseHandler : function (err, asset){
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', asset);
        }
    },
    addDummy : function(res){
        this.connectDB();
        var asset1 = new assetModel({name: 'asset1', properties :[{ name: 'p1', value:'v1'},{name : 'p1', value:'v2'}]});
        var asset2 = new assetModel({name: 'asset1', properties :[{ name: 'p11', value:'v11'},{name : 'p11', value:'v21'}]});
        var asset3 = new assetModel({name: 'asset1', properties :[{ name: 'p111', value:'v111'},{name : 'p111', value:'v211'}]});

        asset1.save(function (err, asset) {
            clsasset.responseHandler(err,asset);
        });
        asset2.save(function (err, asset) {
            clsasset.responseHandler(err,asset);
        });
        asset3.save(function (err, asset) {
            clsasset.responseHandler(err,asset);
        });
        this.disconnectDB();
        res.json(statusOk);
        res.end();
        
    },
    getAll : function(res){
        console.log('GetAll executed');
        this.connectDB();
        assetModel.find({},function(err,docs){
            console.log('dataFetch');
            res.json(docs);
            res.end();
        });
    },
    getById : function(id,res, next){
        console.log('Get by Name executed');
        this.connectDB();
        assetModel.findById(id,
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            }
        );
    },
    deleteById :function(id,res, next){
        console.log('Delete by Name executed');
        this.connectDB();
        
        assetModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) return next(err);
                res.json(statusOk);
                res.end();
            }
        );

    },
    add :function(asset, res, next){
        console.log('Add new asset');
        if((asset) && (asset.name.length) && asset.name.length > 0){
            this.connectDB();
            //assetModel.create(asset);
            assetModel.create(asset,
                function (err, post) {
                    if (err) return next(err);
                    res.json(statusOk);
                    res.end();
                }
            );
            //res.json(statusOk);
        }else{
            res.json(statusError);
            res.end();
        }
    },
    update : function(id, asset, res, next){
        console.log('Update existing asset');
        //validate asset
        if((asset) && (asset.name.length) && asset.name.length > 0 ){
            this.connectDB();
            //assetModel.push(asset);

            assetModel.findByIdAndUpdate(id, asset,
                function (err, post) {
                    if (err) return next(err);
                    res.json(statusOk);
                    res.end();
                }
            );

        }else{
            res.json(statusError);
            res.end();
        }

    }
}


/* GET home page. */
router.get('/addDummy', function(req, res, next) {
    clsasset.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    clsasset.getAll(res);
});

router.get('/get/:id', function(req, res, next) {
    clsasset.getById(req.params.id, res, next);
});

router.delete('/delete/:id', function(req, res, next) {
    clsasset.deleteById(req.params.id, res, next);
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        clsasset.add(req.body, res, next);
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
        clsasset.update(req.params.id, req.body, res, next);
    }
    catch(ex){
        console.log(ex);
        res.json(statusError);
        res.end();
    }

});
module.exports = router;
