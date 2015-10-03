var baseframework = require('../common/baseMongoose');
var baseModel = require('../common/baseSchema');
var Q = require('q');

var hospitalModel = baseModel.Factory.getHospitalInstance();
var locationModel = baseModel.Factory.getLocationInstance();

var clsLocation = function () {
    return {
        responseHandler: function (err, obj) {
            if (err) {
                console.log(err);
            } else {
                console.log('saved successfully:', obj);
            }
        },
        addDummy: function (res) {
            //TODO: To be Removed, Was only required while we dint had screen should be removed
            baseframework.connect();
            var location1 = new locationModel({name: 'Mumbai', address: 'Maharashtra, India'});
            var location2 = new locationModel({name: 'Pune', address: 'Maharashtra, India'});

            location1.save(function (err, data) {
                clsLocation.responseHandler(err, data);
            });
            location2.save(function (err, data) {
                clsLocation.responseHandler(err, data);
            });
            baseframework.close();
            res.json(baseframework.statusOk);
            res.end();
            //mongoose.connection.close();
        },
        getAll: function () {
            console.log('GetAll executed');
            baseframework.connect();
            var defer = Q.defer();
            locationModel.find({}).populate('hospitalId').exec(
                function (err, data) {
                    baseframework.close();
                    if (err) {
                        throw err;
                    }
                    defer.resolve(data);
                });
            return defer.promise;
        },
        getByHospitalId: function (id) {
            console.log('Get by Name executed');
            baseframework.connect();
            var defer = Q.defer();
            locationModel.find({hospitalId: id}).populate('hospitalId').exec(
                function (err, data) {
                    baseframework.close();
                    if (err) {
                        throw err;
                    }
                    defer.resolve(data);
                });
            return defer.promise;
        },
        getById: function (id) {
            console.log('Get by Name executed');
            baseframework.connect();
            var defer = Q.defer();
            locationModel.findById(id).populate('hospitalId').exec(
                function (err, data) {
                    baseframework.close();
                    if (err) {
                        throw err;
                    }
                    defer.resolve(data);
                });
            return defer.promise;
        },
        deleteById: function (id) {
            console.log('Delete by Name executed');
            baseframework.connect();
            var defer = Q.defer();
            locationModel.findByIdAndRemove(id,
                function (err, post) {
                    if (err) {
                        throw err;
                    } else {
                        hospitalModel.findByIdAndUpdate(post.hospitalId, {$pull: {LocationId: id}}, {safe: true, upsert: true},
                            function (err, model) {
                                baseframework.close();
                                if (err) {
                                    throw err;
                                } else {
                                    defer.resolve(baseframework.statusOk);
                                }
                            });
                    }
                }
            );
            return defer.promise;
        },
        add: function (location) {
            var defer = Q.defer();
            console.log('Add new Location');
            if ((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospitalId) && location.hospitalId.length > 0) {
                baseframework.connect();
                locationModel.create(location,
                    function (err, post) {
                        if (err) {
                            throw err;
                        } else {
                            hospitalModel.findByIdAndUpdate(location.hospitalId, {$push: {LocationId: post._id}}, {safe: true, upsert: true},
                                function (err, model) {
                                    baseframework.close();
                                    if (err) {
                                        throw err;
                                    } else {
                                        defer.resolve(baseframework.statusOk);
                                    }
                                });
                        }

                    }
                );
            } else {
                defer.resolve(baseframework.statusError);
            }

            return defer.promise;
        },
        update: function (id, location, res, next) {
            var defer = Q.defer();
            console.log('Update existing location');
            //validate hospital
            if ((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospitalId) && location.hospitalId.length > 0) {
                baseframework.connect();
                //hospitalModel.push(hospital);

                locationModel.findByIdAndUpdate(id, location,
                    function (err, post) {
                        baseframework.close();
                        if (err) {
                            throw err;
                        }
                        defer.resolve(baseframework.statusOk);
                    });

            } else {
                defer.resolve(baseframework.statusError);
            }
            return defer.promise;
        }
    };
}

var factory = {
    getLocationInstance: function () {
        return new clsLocation();
    }
};

module.exports.factory = factory;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;
