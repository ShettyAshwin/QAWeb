var baseframework = require('../common/baseMongoose');
var baseModel = require('../common/baseSchema');
var Q = require('q');

var clsAsset = {
    connectDB: function () {
        baseframework.mongoose.connect(baseframework.dbServer, function (error) {
            if (error) {
                console.log(error);
            }
        });
    },
    disconnectDB: function () {

    },
    responseHandler: function (err, asset) {
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', asset);
        }
    },
    addDummy: function (res) {
        this.connectDB();
        var asset1 = new baseModel.assetModel({name: 'asset1', properties: [
            { name: 'p1', value: 'v1'},
            {name: 'p1', value: 'v2'}
        ]});
        var asset2 = new baseModel.assetModel({name: 'asset1', properties: [
            { name: 'p11', value: 'v11'},
            {name: 'p11', value: 'v21'}
        ]});
        var asset3 = new baseModel.assetModel({name: 'asset1', properties: [
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
        this.disconnectDB();
        res.json(baseframework.statusOk);
        res.end();

    },
    getAll: function () {
        var defer = Q.defer();
        console.log('GetAll executed');
        this.connectDB();
        baseModel.assetModel.find({}, function (err, docs) {
            console.log('dataFetch');
            defer.resolve(docs);
        });

        return defer.promise;
    },
    getById: function (id) {
        var defer = Q.defer();
        console.log('Get by Name executed');
        this.connectDB();
        baseModel.assetModel.findById(id,
            function (err, data) {
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
        this.connectDB();

        baseModel.assetModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) {
                    throw err;
                }
                else {
                    baseModel.hierarchyModel.findByIdAndUpdate(post.hierarchyId, {$pull: {assetId: id}}, {safe: true, upsert: true},
                        function (err, model) {
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
        var defer = Q.defer();
        console.log('Add new asset');
        var defer = Q.defer();
        if ((asset) && (asset.name.length) && asset.name.length > 0 && (asset.hierarchyId) && asset.hierarchyId.length > 0) {
            this.connectDB();
            //baseModel.assetModel.create(asset);
            baseModel.assetModel.create(asset,
                function (err, post) {
                    if (err) {
                        throw err;
                    } else {
                        baseModel.hierarchyModel.findByIdAndUpdate(asset.hierarchyId, {$push: {assetId: post._id}}, {safe: true, upsert: true},
                            function (err, model) {
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
            this.connectDB();
            //baseModel.assetModel.push(asset);

            baseModel.assetModel.findByIdAndUpdate(id, asset,
                function (err, post) {
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
    getByHierarchyId: function (id) {
        var defer = Q.defer();
        console.log('Get by Name executed');
        this.connectDB();
        baseModel.assetModel.find({hierarchyId: id}).populate('Hierarchy').exec(
            function (err, data) {
                if (err) {
                    throw err;
                }
                defer.resolve(data);
            }
        );
        return defer.promise;
    }
};

module.exports.clsAsset = clsAsset;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;