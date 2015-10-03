var baseQueueFactory = require('../common/baseAMQP').factory;
var baseframework = require('../common/baseMongoose');
var Q = require('q');

var clsHospital = function () {
    return {
        addDummy: function (res) {
            //TODO: To be Removed, Was only required while we dint had screen should be removed
            //mongoose.connection.close();
        },
        getAll: function () {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('GetAll executed (From Queue)');
            baseQueue.requestResponse("Hospital.getAll", {}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        getById: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Get By Id executed (From Queue)');
            baseQueue.requestResponse("Hospital.getById", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        deleteById: function (id) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('deleteById executed (From Queue)');
            baseQueue.requestResponse("Hospital.deleteById", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        add: function (hospital) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Add new Hospital executed (From Queue)');
            if ((hospital) && (hospital.name.length) && hospital.name.length > 0 && (hospital.address) && hospital.address.length > 0) {
                baseQueue.requestResponse("Hospital.add", hospital).then(function (data) {
                    defer.resolve(JSON.parse(data));
                });
            } else {
                defer.resolve(baseframework.statusError);
            }

            return defer.promise;
        },
        update: function (id, hospital) {
            var defer = Q.defer();
            var baseQueue = baseQueueFactory.getAmqpInstance();
            console.log('Update existing hospital');
            //validate hospital
            if ((hospital) && (hospital.name.length) && hospital.name.length > 0 && (hospital.address) && hospital.address.length > 0) {
                baseQueue.requestResponse("Hospital.update", {"id": id, "hospital":hospital}).then(function (data) {
                    defer.resolve(JSON.parse(data));
                });
            } else {
                defer.resolve(baseframework.statusError);
            }

            return defer.promise;
        },
        getTree: function () {
            console.log('Get Hospital Tree');
            var baseQueue = baseQueueFactory.getAmqpInstance();
            var defer = Q.defer();
            baseQueue.requestResponse("Hospital.getTree", {}).then(function (data) {
                defer.resolve(JSON.parse(data));
            });
            return defer.promise;
        },
        getTreeById: function (id) {
            console.log('Get Hospital Tree by Id');
            var baseQueue = baseQueueFactory.getAmqpInstance();
            var defer = Q.defer();
            baseQueue.requestResponse("Hospital.getTreeById", {"id": id}).then(function (data) {
                defer.resolve(JSON.parse(data));
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