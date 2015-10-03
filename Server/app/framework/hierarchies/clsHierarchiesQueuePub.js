var baseQueueFactory = require('../common/baseAMQP').factory;
var baseframework = require('../common/baseMongoose');
var Q = require('q');


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
        },
        getAll: function () {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('GetAll executed (From Queue)');
            baseQueue.requestResponse("Hierarchy.getAll", {}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        getById: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Get By Id executed (From Queue)');
            baseQueue.requestResponse("Hierarchy.getById", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        getByLocationId: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Get By Location Id executed (From Queue)');
            baseQueue.requestResponse("Hierarchy.getByLocationId", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        deleteById: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('deleteById executed (From Queue)');
            baseQueue.requestResponse("Hierarchy.deleteById", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        add: function (hierarchy) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Add new hierarchy executed (From Queue)');
            if ((hierarchy) && (hierarchy.name.length) && hierarchy.name.length > 0 && (hierarchy.address) && hierarchy.address.length > 0 && (hierarchy.locationId) && hierarchy.locationId.length > 0) {
                baseQueue.requestResponse("Hierarchy.add", hierarchy).then(function (data) {
                    defer.resolve(JSON.parse(data));
                });
            } else {
                defer.resolve(baseframework.statusError);
            }
            return defer.promise;
        },
        update: function (id, hierarchy) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Update existing hierarchy');
            //validate hierarchy
            if ((hierarchy) && (hierarchy.name.length) && hierarchy.name.length > 0 && (hierarchy.address) && hierarchy.address.length > 0 && (hierarchy.locationId) && hierarchy.locationId.length > 0){
                baseQueue.requestResponse("Hierarchy.update", {"id": id, "hierarchy":hierarchy}).then(function (data) {
                    defer.resolve(JSON.parse(data));
                });
            } else {
                defer.resolve(baseframework.statusError);
            }
            return defer.promise;
        }
    }
}

var factory = {
    getHierarchyInstance: function () {
        return new clsHierarchy();
    }
};

module.exports.factory = factory;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;