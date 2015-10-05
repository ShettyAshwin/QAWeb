var baseframework = require('../common/baseMongoose');
var baseModel = require('../common/baseSchema');
var Q = require('q');

var locationModel = baseModel.Factory.getLocationInstance();
var hierarchyModel = baseModel.Factory.getHierarchyInstance();

var clsHierarchy = function () {
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
            var hierarchy1 = new hierarchyModel({name: 'Hierachy1', address: 'Dummy Address 1'});
            var hierarchy2 = new hierarchyModel({name: 'Hierachy2', address: 'Dummy Address 2'});

            hierarchy1.save(function (err, data) {
                clsHierarchy.responseHandler(err, data);
            });
            hierarchy2.save(function (err, data) {
                clsHierarchy.responseHandler(err, data);
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
            hierarchyModel.find({}).populate('locationId').exec(
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
            var defer = Q.defer();
            console.log('Get by id executed');
            baseframework.connect();
            hierarchyModel.findById(id).populate('locationId').exec(
                function (err, data) {
                    baseframework.close();
                    if (err) {
                        throw err;
                    }
                    defer.resolve(data);
                });
            return defer.promise;
        },
        getByLocationId: function (id) {
            var defer = Q.defer();
            console.log('Get by Name executed');
            baseframework.connect();
            hierarchyModel.find({locationId: id}).populate('locationId').exec(
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
            var defer = Q.defer();
            console.log('Delete by Name executed');
            baseframework.connect();
            hierarchyModel.findByIdAndRemove(id,
                function (err, post) {
                    if (err) {
                        throw err;
                    } else {
                        locationModel.findByIdAndUpdate(post.locationId, {$pull: {hierarchyId: id}}, {safe: true, upsert: true},
                            function (err) {
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
        add: function (hierarchy) {
            var defer = Q.defer();
            console.log('Add new Hospital');
            if ((hierarchy) && (hierarchy.name.length) && hierarchy.name.length > 0 && (hierarchy.address) && hierarchy.address.length > 0 && (hierarchy.locationId) && hierarchy.locationId.length > 0) {
                baseframework.connect();
                hierarchy.type = "hierarchy";
                hierarchyModel.create(hierarchy,
                    function (err, post) {
                        if (err) {
                            throw err;
                        }
                        else {
                            locationModel.findByIdAndUpdate(hierarchy.locationId, {$push: {hierarchyId: post._id}}, {safe: true, upsert: true},
                                function (err) {
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
        update: function (id, hierarchy) {
            var defer = Q.defer();
            console.log('Update existing hierarchy');
            //validate hospital
            if ((hierarchy) && (hierarchy.name.length) && hierarchy.name.length > 0 && (hierarchy.address) && hierarchy.address.length > 0 && (hierarchy.locationId) && hierarchy.locationId.length > 0) {
                baseframework.connect();
                hierarchy.type = "hierarchy";
                hierarchyModel.findByIdAndUpdate(id, hierarchy,
                    function (err) {
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
    }
};

var factory = {
    getHierarchyInstance: function () {
        return new clsHierarchy();
    }
};

module.exports.factory = factory;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;