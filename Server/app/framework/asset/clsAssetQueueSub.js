var baseQueue = require('C:\\Git\\QAWeb\\Server\\app\\framework\\common\\baseAMQP').factory.getAmqpInstance();
var framework = require('C:\\Git\\QAWeb\\Server\\app\\framework\\Asset\\clsAsset');
var Q = require('q');

var clsAsset = framework.factory.getAssetInstance();

baseQueue.subscribe("Asset.getAll", function (data) {
    console.log("Processing data");
    clsAsset.getAll().then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Asset.getById", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsAsset.getById(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Asset.deleteById", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsAsset.deleteById(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Asset.add", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsAsset.add(dataValue).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Asset.update", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsAsset.update(dataValue.id, dataValue.asset).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});

baseQueue.subscribe("Asset.getByHierarchyId", function (data) {
    var dataValue = JSON.parse(data.content.toString());
    clsAsset.getById(dataValue.id).then(function (response) {
        baseQueue.publish(data.properties.replyTo, response, data.properties.correlationId, undefined);
    });
});