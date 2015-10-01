var baseframework = require('../common/baseMongoose');
var Q = require('q');

var hospitalSchema = new baseframework.mongoose.Schema({name: String, address: String});
var hospitalModel = baseframework.mongoose.model('Hospital', hospitalSchema);

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
        res.json(baseframework.statusOk);
        res.end();
        //mongoose.connection.close();
    },
    getAll : function(){
        console.log('GetAll executed');
        var defer = Q.defer();
        this.connectDB();
        hospitalModel.find({},function(err,docs){
            console.log('dataFetch');
            defer.resolve(docs);
        });
        return defer.promise;
    },
    getById : function(id){
        console.log('Get by Name executed');
        this.connectDB();
        var defer = Q.defer();
        hospitalModel.findById(id,
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
        hospitalModel.findByIdAndRemove(id,
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
            hospitalModel.create(hospital,
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
            hospitalModel.findByIdAndUpdate(id, hospital,
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
    }
};

module.exports.clsHospital = clsHospital;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;