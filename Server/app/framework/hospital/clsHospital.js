var baseframework = require('../common/baseMongoose');
var baseModel = require('../common/baseSchema');

var Q = require('q');


var clsHospital  = {
    connectDB : function(){
        baseframework.mongoose.connect(baseframework.dbServer,function(error){
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
        var hospital1 = new baseModel.hospitalModel({name: 'Hospital1', address :'Mumbai, India'});
        var hospital2 = new baseModel.hospitalModel({name: 'Hospital2', address :'Pune, India'});
        var hospital3 = new baseModel.hospitalModel({name: 'Hospital3', address :'Bangalore, India'});

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
        res.json(baseframework.statusOk);
        res.end();
        //mongoose.connection.close();
    },
    getAll : function(){
        console.log('GetAll executed');
        var defer = Q.defer();
        this.connectDB();
        baseModel.hospitalModel.find({},function(err,docs){
            console.log('dataFetch');
            defer.resolve(docs);
        });
        return defer.promise;
    },
    getById : function(id){
        console.log('Get by Name executed');
        this.connectDB();
        var defer = Q.defer();
        baseModel.hospitalModel.findById(id,
            function (err, data) {
                if (err) {
                    throw err;
                }
                defer.resolve(data);
            }
        );
        return defer.promise;
    },
    deleteById :function(id){
        console.log('Delete by Name executed');
        this.connectDB();
        var defer = Q.defer();
        baseModel.hospitalModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) {
                    throw err;
                }
                defer.resolve(baseframework.statusOk);
            }
        );
        return defer.promise;
    },
    add :function(hospital, res, next){
        var defer = Q.defer();
        console.log('Add new Hospital');
        if((hospital) && (hospital.name.length) && hospital.name.length > 0 && (hospital.address) && hospital.address.length > 0){
            this.connectDB();
            baseModel.hospitalModel.create(hospital,
                function (err, post) {
                    if (err) {
                        throw err;
                    }
                    defer.resolve(baseframework.statusOk);
                }
            );
        }else{
            defer.resolve(baseframework.statusError);
        }

        return defer.promise;
    },
    update : function(id, hospital){
        var defer = Q.defer();
        console.log('Update existing hospital');
        //validate hospital
        if((hospital) && (hospital.name.length) && hospital.name.length > 0 && (hospital.address) && hospital.address.length > 0){
            this.connectDB();
            baseModel.hospitalModel.findByIdAndUpdate(id, hospital,
                function (err, post) {
                    if (err) {
                        throw err;
                    }
                    defer.resolve(baseframework.statusOk);
                }
            );

        }else{
            defer.resolve(baseframework.statusError);
        }

        return defer.promise;
    },
    getTree : function () {
        console.log('Get Hospital Tree');
        var defer = Q.defer();
        this.connectDB();
        baseModel.hospitalModel.find({}).populate('LocationId').exec(function(err, docs){
            baseModel.hierarchyModel.populate(docs,'LocationId.hierarchyId',function(err, hier){
                baseModel.assetModel.populate(hier,'LocationId.hierarchyId.assetId',function(err, asset){
                    defer.resolve(docs);
                });
            });
        });
        return defer.promise;
    },
    getTreeById : function (id) {
        console.log('Get Hospital Tree by Id');
        var defer = Q.defer();
        this.connectDB();
        baseModel.hospitalModel.findById(id).populate('LocationId').exec(function(err, docs){
            baseModel.hierarchyModel.populate(docs,'LocationId.hierarchyId',function(err, hier){
                baseModel.assetModel.populate(hier,'LocationId.hierarchyId.assetId',function(err, asset){
                    defer.resolve(docs);
                });
            });
        });
        return defer.promise;
    }

};

module.exports.clsHospital = clsHospital;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;