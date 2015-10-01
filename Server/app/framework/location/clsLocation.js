var baseframework = require('../common/baseMongoose');
var baseModel = require('../common/baseSchema');
var Q = require('q');

var clsLocation  = {
    connectDB : function(){
        baseframework.mongoose.connect(baseframework.dbServer,function(error){
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
        var location1 = new baseModel.locationModel({name: 'Mumbai', address :'Maharashtra, India'});
        var location2 = new baseModel.locationModel({name: 'Pune', address :'Maharashtra, India'});

        location1.save(function (err, data) {
            clsLocation.responseHandler(err,data);
        });
        location2.save(function (err, data) {
            clsLocation.responseHandler(err,data);
        });
        this.disconnectDB();
        res.json(baseframework.statusOk);
        res.end();
        //mongoose.connection.close();
    },
    getAll : function(){
        console.log('GetAll executed');
        this.connectDB();
        var defer = Q.defer();
        baseModel.locationModel.find({}).populate('Hospital').exec(
            function (err, data) {
                if (err) {
                    throw err;
                }
                defer.resolve(data);
            });
        return defer.promise;
    },
    getByHospitalId : function(id){
        console.log('Get by Name executed');
        this.connectDB();
        var defer = Q.defer();
        baseModel.locationModel.find({hospitalId : id}).populate('Hospital').exec(
            function (err, data) {
                if (err) {
                    throw err;
                }
                defer.resolve(data);
            });
        return defer.promise;
    },
    getById : function(id){
        console.log('Get by Name executed');
        this.connectDB();
        baseModel.locationModel.findById(id).populate('Hospital').exec(
            function (err, data) {
                if (err) {
                    throw err;
                }
                defer.resolve(data);
            });
        return defer.promise;
    },
    deleteById :function(id){
        console.log('Delete by Name executed');
        this.connectDB();
        var defer = Q.defer();
        baseModel.locationModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) {
                    throw err;
                }
                defer.resolve(baseframework.statusOk);
            }
        );
        return defer.promise;
    },
    add :function(location){
        var defer = Q.defer();
        console.log('Add new Location');
        if((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospitalId) && location.hospitalId.length > 0){
            this.connectDB();
            baseModel.locationModel.create(location,
                function (err, post) {
                    if (err) {
                        throw err;
                    }else{
                        baseModel.hospitalModel.findByIdAndUpdate(location.hospitalId,{$push : {LocationId : post._id}},{safe: true, upsert: true},
                            function(err, model) {
                                if (err) {
                                    throw err;
                                }else{
                                    defer.resolve(baseframework.statusOk);
                                }
                            });
                    }

                }
            );
        }else{
            defer.resolve(baseframework.statusError);
        }

        return defer.promise;
    },
    update : function(id, location, res, next){
        var defer = Q.defer();
        console.log('Update existing location');
        //validate hospital
        if((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospitalId) && location.hospitalId.length > 0){
            this.connectDB();
            //hospitalModel.push(hospital);

            baseModel.locationModel.findByIdAndUpdate(id, location,
                function (err, post) {
                    if (err) {
                        throw err;
                    }
                    defer.resolve(baseframework.statusOk);
                });

        }else{
            defer.resolve(baseframework.statusError);
        }
        return defer.promise;
    }
};

module.exports.clsLocation = clsLocation;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;
