var amqp = require('amqplib/callback_api');
var ampServer = 'amqp://localhost';
var callBackExtension = "_CallBack";


var clsAmqp = {
    getUniqueId : function(){
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    },
    publish : function(){

    },
    subscribe : function(){

    },
    requestResponse : function(queueName, data, callBackFunc){
        amqp.connect(ampServer, function(err, conn) {
            conn.createChannel(function(err, ch) {
                ch.assertQueue(queueName + callBackExtension, {exclusive: true, durable: true}, function(err, q) {
                    var corr = this.getUniqueId();
                    var message = JSON.stringify(data);

                    console.log(' [x] Requesting fib(%d)', message);

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