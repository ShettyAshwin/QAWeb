var baseQueue = require('C:\\Git\\QAWeb\\Server\\app\\framework\\common\\baseAMQP').factory.getAmqpInstance();
var framework = require('C:\\Git\\QAWeb\\Server\\app\\framework\\hospital\\clsHospital');
var Q = require('q');

var clsHospital = framework.factory.getHospitalInstance();

baseQueue.subscribe("Hospital.getAll", function (data) {
    console.log("Processing data");
    clsHospital.getAll().then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Hospital.getById", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsHospital.getById(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });

});

baseQueue.subscribe("Hospital.deleteById", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsHospital.deleteById(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Hospital.add", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsHospital.add(dataValue).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Hospital.update", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsHospital.update(dataValue.id, dataValue.Hospital).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Hospital.getTree", function (data) {
    console.log("Processing data");
    clsHospital.getTree().then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});


baseQueue.subscribe("Hospital.getTreeById", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsHospital.getTree(dataValue.Id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

