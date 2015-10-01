var amqp = require('amqplib/callback_api');
var ampServer = 'amqp://localhost';
var callBackExtension = "_CallBack";
var subscriptionConnection = null;


var clsAmqp = {
    getUniqueId : function(){
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    },
    connect : function(callBackFunc){
        if(subcriptionConnection === null){
            amqp.connect(ampServer, function(err, conn) {
                if (err) {
                    console.error("[AMQP]", err.message);
                }
                conn.on("error", function(err) {
                    if (err.message !== "Connection closing") {
                        console.error("[AMQP] conn error", err.message);
                    }
                });
                conn.on("close", function() {
                    console.error("[AMQP] conn close");
                });
                console.log("[AMQP] connected");
                subscriptionConnection = conn;
                if(callBackFunc){
                    callBackFunc();
                }
            });
        }else{
           if(callBackFunc){
               callBackFunc();
           }
        }
    },
    publish : function(){

    },
    subscribe : function(queueName,callBackFunc){
        this.connect(function(){
            conn.createChannel(function(err, ch) {
                ch.assertQueue(queueName, {durable: true});
                ch.prefetch(1);
                console.log(' [x] Awaiting RPC requests for queue : ' + queueName);
                ch.consume(queueName, function reply(msg) {
                    var message = JSON.parse(msg.content.toString());
                    console.log("Process Message for queue : " + queueName, message);
                    if(callBackFunc){
                        try{
                            callBackFunc(message,function(responseData){
                                ch.sendToQueue(msg.properties.replyTo,
                                    new Buffer(JSON.stringify(responseData)),
                                    {correlationId: msg.properties.correlationId});
                                ch.ack(msg);
                            });
                        }catch(ex){

                        }

                    }else{
                        console.log("Call back function is undefined for queue : " + queueName);
                    }

                });
            });
        })
    },
    requestResponse : function(queueName, data, callBackFunc){
        amqp.connect(ampServer, function(err, conn) {
            conn.createChannel(function(err, ch) {
                ch.assertQueue(queueName + callBackExtension, {exclusive: true, durable: true}, function(err, q) {
                    var corr = this.getUniqueId();
                    var message = JSON.stringify(data);

                    console.log(' [x] Requesting ' + queueName, message);

                    ch.consume(queueName + callBackExtension, function(msg) {
                        if (msg.properties.correlationId == corr) {
                            console.log(' [.] Got %s', msg.content.toString());
                            if(callBackFunc){
                                callBackFunc(msg.content);
                            };
                        };
                    }, {noAck: true});

                    ch.sendToQueue(queueName,
                        new Buffer(message),
                        { correlationId: corr, replyTo: queueName + callBackExtension});
                });
            });
        });

    }
}

module.exports.clsAmpq = clsAmqp;var amqp = require('amqplib/callback_api');
var ampServer = 'amqp://localhost';
var callBackExtension = "_CallBack";
var subscriptionConnection = null;


var clsAmqp = {
    getUniqueId : function(){
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    },
    connect : function(callBackFunc){
        if(subcriptionConnection === null){
            amqp.connect(ampServer, function(err, conn) {
                if (err) {
                    console.error("[AMQP]", err.message);
                }
                conn.on("error", function(err) {
                    if (err.message !== "Connection closing") {
                        console.error("[AMQP] conn error", err.message);
                    }
                });
                conn.on("close", function() {
                    console.error("[AMQP] conn close");
                });
                console.log("[AMQP] connected");
                subscriptionConnection = conn;
                if(callBackFunc){
                    callBackFunc();
                }
            });
        }else{
           if(callBackFunc){
               callBackFunc();
           }
        }
    },
    publish : function(){

    },
    subscribe : function(queueName,callBackFunc){
        this.connect(function(){
            conn.createChannel(function(err, ch) {
                ch.assertQueue(queueName, {durable: true});
                ch.prefetch(1);
                console.log(' [x] Awaiting RPC requests for queue : ' + queueName);
                ch.consume(queueName, function reply(msg) {
                    var message = JSON.parse(msg.content.toString());
                    console.log("Process Message for queue : " + queueName, message);
                    if(callBackFunc){
                        try{
                            callBackFunc(message,function(responseData){
                                ch.sendToQueue(msg.properties.replyTo,
                                    new Buffer(JSON.stringify(responseData)),
                                    {correlationId: msg.properties.correlationId});
                                ch.ack(msg);
                            });
                        }catch(ex){
                            console.log("Error while process callback function for queue : " + queueName);
                        }

                    }else{
                        console.log("Call back function is undefined for queue : " + queueName);
                    }

                });
            });
        })
    },
    requestResponse : function(queueName, data, callBackFunc){
        amqp.connect(ampServer, function(err, conn) {
            conn.createChannel(function(err, ch) {
                ch.assertQueue(queueName + callBackExtension, {exclusive: true, durable: true}, function(err, q) {
                    var corr = this.getUniqueId();
                    var message = JSON.stringify(data);

                    console.log(' [x] Requesting ' + queueName, message);

                    ch.consume(queueName + callBackExtension, function(msg) {
                        if (msg.properties.correlationId == corr) {
                            console.log(' [.] Got %s', msg.content.toString());
                            if(callBackFunc){
                                callBackFunc(msg.content);
                            };
                        };
                    }, {noAck: true});

                    ch.sendToQueue(queueName,
                        new Buffer(message),
                        { correlationId: corr, replyTo: queueName + callBackExtension});
                });
            });
        });

    }
}

module.exports.clsAmpq = clsAmqp;