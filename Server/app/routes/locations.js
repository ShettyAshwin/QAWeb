var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({name: String, address: String, hospitalId : {type: mongoose.Schema.Types.ObjectId, ref:'Hospital'}});
var locationModel = mongoose.model('Location', locationSchema);


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
var clsLocation  = {
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
        var location1 = new locationModel({name: 'Mumbai', address :'Maharashtra, India'});
        var location2 = new locationModel({name: 'Pune', address :'Maharashtra, India'});

        location1.save(function (err, data) {
            clsLocation.responseHandler(err,data);
        });
        location2.save(function (err, data) {
            clsLocation.responseHandler(err,data);
        });
        this.disconnectDB();
        res.json(statusOk);
        res.end();
        //mongoose.connection.close();
    },
    getAll : function(res){
        console.log('GetAll executed');
        this.connectDB();
        locationModel.find({}).populate('Hospital').exec(
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            });
        /*locationModel.find({},function(err,docs){
            docs.forEach(function(item){
                hospitalModel.find({_id : item.hospitalId},function(err,hospital){
                    if((hospital) && hospital.length > 0){
                        item.Hospital = hospital[0];
                    }
                });
            });
            res.json(docs);
            res.end();
        });*/
    },
    getById : function(id,res, next){
        console.log('Get by Name executed');
        this.connectDB();
        locationModel.findOne(id).populate('Hospital').exec(
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            });
    },
    deleteById :function(id,res, next){
        console.log('Delete by Name executed');
        this.connectDB();
        locationModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) return next(err);
                res.json(statusOk);
                res.end();
            }
        );

    },
    add :function(location, res, next){
        console.log('Add new Hospital');
        if((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospitalId) && location.hospitalId.length > 0){
            this.connectDB();
            locationModel.create(location,
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


/* GET home page. */
router.get('/addDummy', function(req, res, next) {
    clsLocation.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    clsLocation.getAll(res);
});

router.get('/get/:id', function(req, res, next) {
    clsLocation.getById(req.params.id, res, next);
});

router.delete('/delete/:id', function(req, res, next) {
    clsLocation.deleteById(req.params.id, res, next);
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        clsLocation.add(req.body, res, next);
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



