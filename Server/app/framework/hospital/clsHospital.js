var baseframework = require('../common/baseMongoose');
var baseModel = require('../common/baseSchema');
var Q = require('q');

var hospitalModel = baseModel.Factory.getHospitalInstance();
var hierarchyModel = baseModel.Factory.getHierarchyInstance();
var assetModel = baseModel.Factory.getAssetInstance();
var locationModel = baseModel.Factory.getLocationInstance();

var clsHospital = function () {
    return {
        responseHandler: function (err, hospital) {
            if (err) {
                console.log(err);
            } else {
                console.log('saved successfully:', hospital);
            }
        },
        addDummy: function (res) {
            //TODO: To be Removed, Was only required while we dint had screen should be removed
            baseframework.connect();
            var hospital1 = new hospitalModel({name: 'Hospital1', address: 'Mumbai, India'});
            var hospital2 = new hospitalModel({name: 'Hospital2', address: 'Pune, India'});
            var hospital3 = new hospitalModel({name: 'Hospital3', address: 'Bangalore, India'});

            hospital1.save(function (err, hospital) {
                clsHospital.responseHandler(err, hospital);
            });
            hospital2.save(function (err, hospital) {
                clsHospital.responseHandler(err, hospital);
            });
            hospital3.save(function (err, hospital) {
                clsHospital.responseHandler(err, hospital);
            });
            baseframework.close();
            res.json(baseframework.statusOk);
            res.end();
            //mongoose.connection.close();
        },
        getAll: function () {
            console.log('GetAll executed');
            var defer = Q.defer();
            baseframework.connect();
            hospitalModel.find({}, function (err, docs) {
                baseframework.close();
                if (err) {
                    throw err;
                }
                console.log('dataFetch');
                defer.resolve(docs);
            });
            return defer.promise;
        },
        getById: function (id) {
            console.log('Get by ID executed : ' , id );
            baseframework.connect();
            var defer = Q.defer();
            hospitalModel.findById(id,
                function (err, data) {
                    baseframework.close();
                    if (err) {
                        throw err;
                    }
                    defer.resolve(data);
                }
            );
            return defer.promise;
        },
        deleteById: function (id) {
            console.log('Delete by Name executed');
            baseframework.connect();
            var defer = Q.defer();
            hospitalModel.findByIdAndRemove(id,
                function (err, post) {
                    baseframework.close();
                    if (err) {
                        throw err;
                    }
                    defer.resolve(baseframework.statusOk);
                }
            );
            return defer.promise;
        },
        add: function (hospital) {
            var defer = Q.defer();
            console.log('Add new Hospital');
            if ((hospital) && (hospital.name.length) && hospital.name.length > 0 && (hospital.address) && hospital.address.length > 0) {
                baseframework.connect();
                hospitalModel.create(hospital,
                    function (err, post) {
                        baseframework.close();
                        if (err) {
                            throw err;
                        }
                        defer.resolve(baseframework.statusOk);
                    }
                );
            } else {
                defer.resolve(baseframework.statusError);
            }

            return defer.promise;
        },
        update: function (id, hospital) {
            var defer = Q.defer();
            console.log('Update existing hospital');
            //validate hospital
            if ((hospital) && (hospital.name.length) && hospital.name.length > 0 && (hospital.address) && hospital.address.length > 0) {
                baseframework.connect();
                hospitalModel.findByIdAndUpdate(id, hospital,
                    function (err, post) {
                        baseframework.close();
                        if (err) {
                            throw err;
                        }
                        defer.resolve(baseframework.statusOk);
                    }
                );

            } else {
                defer.resolve(baseframework.statusError);
            }

            return defer.promise;
        },
        getTree: function () {
            console.log('Get Hospital Tree');
            var defer = Q.defer();
            baseframework.connect();
            hospitalModel.find({}).populate('LocationId').exec(function (err, docs) {
                hierarchyModel.populate(docs, 'LocationId.hierarchyId', function (err, hier) {
                    assetModel.populate(hier, 'LocationId.hierarchyId.assetId', function (err, asset) {
                        baseframework.close();
                        if (err) {
                            throw err;
                        }
                        defer.resolve(docs);
                    });
                });
            });
            return defer.promise;
        },
        getTreeById: function (id) {
            console.log('Get Hospital Tree by Id');
            var defer = Q.defer();
            baseframework.connect();
            hospitalModel.findById(id).populate('LocationId').exec(function (err, docs) {
                hierarchyModel.populate(docs, 'LocationId.hierarchyId', function (err, hier) {
                    assetModel.populate(hier, 'LocationId.hierarchyId.assetId', function (err, asset) {
                        baseframework.close();
                        if (err) {
                            throw err;
                        }
                        defer.resolve(docs);
                    });
                });
            });
            return defer.promise;
        }

    };
}

var factory = {
    getHospitalInstance: function () {
        return new clsHospital();
    }
}

module.exports.factory = factory;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;