var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var hierarchySchema = new mongoose.Schema({name: String, address: String, order : Number, location : {type: mongoose.Schema.Types.ObjectId, ref:'Location'}});
var hierarchyModel = mongoose.model('Hierarchy', hierarchySchema);

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

var clsHierarchy  = {
    connectDB : function(){
        mongoose.connect(dbServer,function(error){
            if(error){
                console.log(error);
            }
        });
    },
    disconnectDB :function(){

    },
    responseHandler : function (err, obj){
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', obj);
        }
    },
    addDummy : function(res){
        this.connectDB();
        var hierarchy1 = new hierarchyModel({name: 'Hierachy1', address :'Dummy Address 1'});
        var hierarchy2 = new hierarchyModel({name: 'Hierachy2', address :'Dummy Address 2'});
        var hierarchy3 = new hierarchyModel({name: 'Hierachy2', address :'Dummy Address 2'});

        hierarchy1.save(function (err, data) {
            clsHierarchy.responseHandler(err,data);
        });
        hierarchy2.save(function (err, data) {
            clsHierarchy.responseHandler(err,data);
        });
        this.disconnectDB();
        res.json(statusOk);
        res.end();
        //mongoose.connection.close();
    },
    getAll : function(res){
        console.log('GetAll executed');
        this.connectDB();
        hierarchyModel.find({}).populate('Location').exec(
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            });
    },
    getById : function(id,res, next){
        console.log('Get by Name executed');
        this.connectDB();
        hierarchyModel.findOne(id).populate('location').exec(
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            });
    },
    deleteById :function(id,res, next){
        console.log('Delete by Name executed');
        this.connectDB();
        hierarchyModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) return next(err);
                res.json(statusOk);
                res.end();
            }
        );

    },
    add :function(hierarchy, res, next){
        console.log('Add new Hospital');
        if((hierarchy) && (hierarchy.name.length) && hierarchy.name.length > 0 && (hierarchy.address) && hierarchy.address.length > 0 && (hierarchy.location) && hierarchy.location.length > 0){
            this.connectDB();
            hierarchyModel.create(location,
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
    update : function(id, location, res, next){
        console.log('Update existing location');
        //validate hospital
        if((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospitalId) && location.hospitalId.length > 0){
            this.connectDB();
            //hospitalModel.push(hospital);

            locationModel.findByIdAndUpdate(id, location,
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

router.get('/addDummy', function(req, res, next) {
    clsHierarchy.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    clsHierarchy.getAll(res);
});

router.get('/get/:id', function(req, res, next) {
    clsHierarchy.getById(req.params.id, res, next);
});

router.delete('/delete/:id', function(req, res, next) {
    clsHierarchy.deleteById(req.params.id, res, next);
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        clsHierarchy.add(req.body, res, next);
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
        clsLocation.update(req.params.id, req.body, res, next);
    }
    catch(ex){
        console.log(ex);
        res.json(statusError);
        res.end();
    }

});
module.exports = router;
