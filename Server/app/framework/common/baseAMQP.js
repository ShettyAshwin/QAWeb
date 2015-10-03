var amqp = require('amqplib/callback_api');
var config = require('../../appConfiguration').appConfig;
var ampServer = config.amqpServer;
var callBackExtension = "_CallBack";
var Q = require('q');

var amqpConnection = undefined;
var pendingSub = [];

amqp.connect(ampServer, function (err, conn) {
    console.log("Getting new Connection");
    if (err) {
        console.error("[AMQP]", err.message);
    }
    conn.on("error", function (err) {
        if (err.message !== "Connection closing") {
            console.error("[AMQP] conn error", err.message);
        }
    });
    conn.on("close", function () {
        console.error("[AMQP] conn close");
    });
    console.log("[AMQP] connected");
    amqpConnection = conn;
    if(pendingSub.length > 0){
        pendingSub.forEach(function(obj){
            obj.CurrentInstance.subscribe(obj.queueName, obj.callBack);
        });

        pendingSub = [];
    }
});

var getUniqueId = function () {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
};


var clsAmqp = function () {
    return {
        publish: function (queueName, data, messageId, replyToQueue) {
            var defer = Q.defer();
            amqpConnection.createChannel(function (err, ch) {
                ch.assertQueue(queueName, { durable: true }, function (err, q) {
                    var message = JSON.stringify(data);

                    console.log(' [x] Publishing ' + queueName + ":", message);

                    ch.sendToQueue(queueName,
                        new Buffer(message), { correlationId: messageId, replyTo: replyToQueue + callBackExtension, durable: true, persistent: true});
                    ch.close();
                });
            });

            return defer.promise;
        },
        subscribe: function (queueName, callBackFunc) {
            if (!amqpConnection) {
                pendingSub.push({"queueName" : queueName, "callBack": callBackFunc, "CurrentInstance": this });
            } else {
                amqpConnection.createChannel(function (err, ch, deliveryInfo, ack) {
                    ch.assertQueue(queueName, {durable: true});
                    ch.prefetch(1);
                    console.log(' [x] Awaiting RPC requests for queue : ' + queueName);
                    ch.consume(queueName, function reply(msg) {
                        console.log('Process Message : ' + JSON.stringify(msg));
                        if (callBackFunc) {
                            try {
                                callBackFunc(msg);
                                ch.ack(msg);
                            } catch (ex) {
                                console.log(err);
                            }

                        }
                    }, {ack: true, prefetchCount: 1});
                });

            }

        },
        requestResponse: function (queueName, data) {
            var defer = Q.defer();
            amqpConnection.createChannel(function (err, ch) {
                ch.assertQueue(queueName + callBackExtension, { durable: true }, function (err, q) {
                    var corr = getUniqueId();
                    var message = JSON.stringify(data);

                    console.log(' [x] Requesting ' + queueName, message);

                    ch.consume(queueName + callBackExtension, function (msg) {
                        console.log('Got data for ID :' + msg.properties.correlationId + " Expecting ID :" + corr);
                        if (msg.properties.correlationId == corr) {
                            console.log(' [.] Got %s', JSON.stringify(msg.content.toString()));
                            ch.ack(msg);
                            corr = undefined;
                            ch.close();
                            defer.resolve(msg.content.toString());
                        }
                        ;
                    }, {ack: true, prefetchCount: 1});

                    ch.sendToQueue(queueName,
                        new Buffer(message),
                        { correlationId: corr, replyTo: queueName + callBackExtension, durable: true, persistent: true});
                });
            });
            return defer.promise;
        }
    }
}

var factory = {
    getAmqpInstance: function () {
        return clsAmqp();
    }
}

module.exports.factory = factory;