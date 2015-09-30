var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var hospitalSchema = new mongoose.Schema({name: String, address: String});
var hospitalModel = mongoose.model('Hospital', hospitalSchema);

var dbServer = 'mongodb://localhost:27017/QAWeb';
var statusOk = {status:'200', detail :''};
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
var clsHospital  = {
    connectDB : function(){
        mongoose.connect(dbServer,function(error){
            if(error){
                console.log(error);
            }
        });
    },
    disconnectDB :function(){

    },
    responseHandler : function (err, hospital){
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', hospital);
        }
    },
    addDummy : function(res){
        this.connectDB();
        var hospital1 = new hospitalModel({name: 'Hospital1', address :'Mumbai, India'});
        var hospital2 = new hospitalModel({name: 'Hospital2', address :'Pune, India'});
        var hospital3 = new hospitalModel({name: 'Hospital3', address :'Bangalore, India'});

        hospital1.save(function (err, hospital) {
            clsHospital.responseHandler(err,hospital);
        });
        hospital2.save(function (err, hospital) {
            clsHospital.responseHandler(err,hospital);
        });
        hospital3.save(function (err, hospital) {
            clsHospital.responseHandler(err,hospital);
        });
        this.disconnectDB();
        res.json(statusOk);
        res.end();
        //mongoose.connection.close();
    },
    getAll : function(res){
        console.log('GetAll executed');
        this.connectDB();
        hospitalModel.find({},function(err,docs){
            console.log('dataFetch');
            res.json(docs);
            res.end();
        });
    },
    getById : function(id,res, next){
        console.log('Get by Name executed');
        this.connectDB();
        /*
         hospitalModel.find({name:hospitalName},function(err,docs){
         res.json(docs);
         res.end();
         });
         */
        hospitalModel.findById(id,
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
        /*
         hospitalModel.splice({name:hospitalName},function(err,docs){
         res.json(statusOk);
         res.end();
         });
         */
        hospitalModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) return next(err);
                res.json(statusOk);
                res.end();
            }
        );

    },
    add :function(hospital, res, next){
        console.log('Add new Hospital');
        if((hospital) && (hospital.name.length) && hospital.name.length > 0 && (hospital.address) && hospital.address.length > 0){
            this.connectDB();
            //hospitalModel.create(hospital);
            hospitalModel.create(hospital,
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
    update : function(id, hospital, res, next){
        console.log('Update existing hospital');
        //validate hospital
        if((hospital) && (hospital.name.length) && hospital.name.length > 0 && (hospital.address) && hospital.address.length > 0){
            this.connectDB();
            //hospitalModel.push(hospital);

            hospitalModel.findByIdAndUpdate(id, hospital,
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
    clsHospital.addDummy(res);
});

router.get('/getAll', function(req, res, next) {
    clsHospital.getAll(res);
});

router.get('/get/:id', function(req, res, next) {
    clsHospital.getById(req.params.id, res, next);
});

router.delete('/delete/:id', function(req, res, next) {
    clsHospital.deleteById(req.params.id, res, next);
});

router.post('/add',function(req, res, next){
    try{
        console.log('In Add');
        console.log(req.body);
        clsHospital.add(req.body, res, next);
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
        clsHospital.update(req.params.id, req.body, res, next);
    }
    catch(ex){
        console.log(ex);
        res.json(statusError);
        res.end();
    }

});
module.exports = router;
