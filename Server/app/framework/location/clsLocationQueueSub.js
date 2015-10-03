var baseQueue = require('C:\\Git\\QAWeb\\Server\\app\\framework\\common\\baseAMQP').factory.getAmqpInstance();
var framework = require('C:\\Git\\QAWeb\\Server\\app\\framework\\location\\clsLocation');
var Q = require('q');

var clsLocation = framework.factory.getLocationInstance();

baseQueue.subscribe("Location.getAll", function (data) {
    console.log("Processing data");
    clsLocation.getAll().then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Location.getByHospitalId", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsLocation.getByHospitalId(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });

});

baseQueue.subscribe("Location.getById", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsLocation.getById(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });

});

baseQueue.subscribe("Location.deleteById", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsLocation.deleteById(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Location.add", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsLocation.add(dataValue).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Location.update", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsLocation.update(dataValue.id, dataValue.Location).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});