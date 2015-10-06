var baseframework = require('../common/baseMongoose');
var baseModel = require('../common/baseSchema');
var Q = require('q');

var hierarchyModel = baseModel.Factory.getHierarchyInstance();
var assetModel = baseModel.Factory.getAssetInstance();

var clsAsset = function () {
    return {
        responseHandler: function (err, asset) {
            if (err) {
                console.log(err);
            } else {
                console.log('saved successfully:', asset);
            }
        },
        addDummy: function (res) {
            //TODO: To be Removed, Was only required while we dint had screen should be removed
            baseframework.connect();
            var asset1 = new assetModel({name: 'asset1', properties: [
                { name: 'p1', value: 'v1'},
                {name: 'p1', value: 'v2'}
            ]});
            var asset2 = new assetModel({name: 'asset1', properties: [
                { name: 'p11', value: 'v11'},
                {name: 'p11', value: 'v21'}
            ]});
            var asset3 = new assetModel({name: 'asset1', properties: [
                { name: 'p111', value: 'v111'},
                {name: 'p111', value: 'v211'}
            ]});

            asset1.save(function (err, asset) {
                clsAsset.responseHandler(err, asset);
            });
            asset2.save(function (err, asset) {
                clsAsset.responseHandler(err, asset);
            });
            asset3.save(function (err, asset) {
                clsAsset.responseHandler(err, asset);
            });
            baseframework.close();
            res.json(baseframework.statusOk);
            res.end();

        },
        getAll: function () {
            var defer = Q.defer();
            console.log('GetAll executed');
            baseframework.connect();
            assetModel.find({}, function (err, docs) {
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
            var defer = Q.defer();
            console.log('Get by Name executed');
            baseframework.connect();
            assetModel.findById(id,
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
            var defer = Q.defer();
            console.log('Delete by Name executed');
            baseframework.connect();

            assetModel.findByIdAndRemove(id,
                function (err, post) {
                    if (err) {
                        throw err;
                    }
                    else {
                        hierarchyModel.findByIdAndUpdate(post.hierarchyId, {$pull: {assetId: id}}, {safe: true, upsert: true},
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
        add: function (asset) {
            console.log('Add new asset');
            var defer = Q.defer();
            if ((asset) && (asset.name.length) && asset.name.length > 0 && (asset.hierarchyId) && asset.hierarchyId.length > 0) {
                baseframework.connect();
                //assetModel.create(asset);
                asset.type ="asset";
                assetModel.create(asset,
                    function (err, post) {
                        if (err) {
                            throw err;
                        } else {
                            hierarchyModel.findByIdAndUpdate(asset.hierarchyId, {$push: {assetId: post._id}}, {safe: true, upsert: true},
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
                //res.json(statusOk);
            } else {
                defer.resolve(baseframework.statusError);
            }

            return defer.promise;
        },
        update: function (id, asset) {
            var defer = Q.defer();
            console.log('Update existing asset');
            //validate asset
            if ((asset) && (asset.name.length) && asset.name.length > 0) {
                baseframework.connect();
                asset.type ="asset";
                //assetModel.push(asset);

                assetModel.findByIdAndUpdate(id, asset,
                    function (err) {
                        baseframework.close();
                        if (err) {
                            throw err;
                        }else {
                            /*hierarchyModel.findByIdAndUpdate(asset.hierarchyId, {$push: {assetId: post._id}}, {safe: true, upsert: true},
                                function (err, model) {
                                    baseframework.close();
                                    if (err) {
                                        throw err;
                                    } else {
                                        defer.resolve(baseframework.statusOk);
                                    }
                                });*/
                              defer.resolve(baseframework.statusOk);
                        }
                    }
                );

            } else {
                defer.resolve(baseframework.statusError);
            }

            return defer.promise;
        },
        getByHierarchyId: function (id) {
            var defer = Q.defer();
            console.log('Get by Name executed');
            baseframework.connect();
            assetModel.find({hierarchyId: id}).populate('Hierarchy').exec(
                function (err, data) {
                    baseframework.close();
                    if (err) {
                        throw err;
                    }
                    defer.resolve(data);
                }
            );
            return defer.promise;
        }
    };
};

var factory = {
    getAssetInstance: function () {
        return new clsAsset();
    }
};

module.exports.factory = factory;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;