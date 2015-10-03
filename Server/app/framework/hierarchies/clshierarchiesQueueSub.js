var baseQueue = require('C:\\Git\\QAWeb\\Server\\app\\framework\\common\\baseAMQP').factory.getAmqpInstance();
var framework = require('C:\\Git\\QAWeb\\Server\\app\\framework\\hierarchies\\clsHierarchies');
var Q = require('q');

var clsHierarchy = framework.factory.getHierarchyInstance();

baseQueue.subscribe("Hierarchy.getAll", function (data) {
    console.log("Processing data");
    clsHierarchy.getAll().then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Hierarchy.getById", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsHierarchy.getById(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Hierarchy.getByLocationId", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsHierarchy.getByLocationId(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Hierarchy.deleteById", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsHierarchy.deleteById(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Hierarchy.add", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsHierarchy.add(dataValue).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Hierarchy.update", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsLocation.update(dataValue.id, dataValue.hierarchy).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});