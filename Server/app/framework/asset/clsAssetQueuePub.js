var baseQueueFactory = require('../common/baseAMQP').factory;
var baseframework = require('../common/baseMongoose');
var Q = require('q');

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
        },
        getAll: function () {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('GetAll executed (From Queue)');
            baseQueue.requestResponse("Asset.getAll", {}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        getById: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Get By Id executed (From Queue)');
            baseQueue.requestResponse("Asset.getById", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        deleteById: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('deleteById executed (From Queue)');
            baseQueue.requestResponse("Asset.deleteById", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        add: function (asset) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Add new Asset executed (From Queue)');
            if ((asset) && (asset.name.length) && asset.name.length > 0 && (asset.hierarchyId) && asset.hierarchyId.length > 0)  {
                baseQueue.requestResponse("Asset.add", asset).then(function (data) {
                    defer.resolve(JSON.parse(data));
                });
            } else {
                defer.resolve(baseframework.statusError);
            }
            return defer.promise;
        },
        update: function (id, asset) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Update existing asset');
            //validate Asset
            if ((asset) && (asset.name.length) && asset.name.length > 0) {
                baseQueue.requestResponse("Asset.update", {"id": id, "asset":asset}).then(function (data) {
                    defer.resolve(JSON.parse(data));
                });
            } else {
                defer.resolve(baseframework.statusError);
            }
            return defer.promise;
        },
        getByHierarchyId: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Get By Hierarchy Id executed (From Queue)');
            baseQueue.requestResponse("Asset.getByHierarchyId", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        }
    };
}

var factory = {
    getAssetInstance: function () {
        return new clsAsset();
    }
};

module.exports.factory = factory;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;