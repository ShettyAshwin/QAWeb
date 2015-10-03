var baseQueueFactory = require('../common/baseAMQP').factory;
var baseframework = require('../common/baseMongoose');
var Q = require('q');

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
        },
        getAll: function () {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('GetAll executed (From Queue)');
            baseQueue.requestResponse("Location.getAll", {}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        getByHospitalId: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Get By Id executed (From Queue)');
            baseQueue.requestResponse("Location.getByHospitalId", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        getById: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Get By Id executed (From Queue)');
            baseQueue.requestResponse("Location.getById", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        deleteById: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('deleteById executed (From Queue)');
            baseQueue.requestResponse("Location.deleteById", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        add: function (location) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Add new Location executed (From Queue)');
            if ((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospitalId) && location.hospitalId.length > 0) {
                baseQueue.requestResponse("Location.add", location).then(function (data) {
                    defer.resolve(JSON.parse(data));
                });
            } else {
                defer.resolve(baseframework.statusError);
            }

            return defer.promise;
        },
        update: function (id, location) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Update existing location');
            //validate location
            if ((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospitalId) && location.hospitalId.length > 0) {
                baseQueue.requestResponse("Location.update", {"id": id, "location":location}).then(function (data) {
                    defer.resolve(JSON.parse(data));
                });
            } else {
                defer.resolve(baseframework.statusError);
            }

            return defer.promise;
        }
    };
};

var factory = {
    getLocationInstance: function () {
        return new clsLocation();
    }
}

module.exports.factory = factory;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;