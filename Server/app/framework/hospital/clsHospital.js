var baseframework = require('../common/baseMongoose');

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
         res.json(baseframework.statusOk);
         res.end();
         });
         */
        hospitalModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) return next(err);
                res.json(baseframework.statusOk);
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
                    res.json(baseframework.statusOk);
                    res.end();
                }
            );
            //res.json(framework.statusOk);
        }else{
            res.json(baseframework.statusError);
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
                    res.json(baseframework.statusOk);
                    res.end();
                }
            );

        }else{
            res.json(baseframework.statusError);
            res.end();
        }

    }
};

module.exports.clsHospital = clsHospital;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;