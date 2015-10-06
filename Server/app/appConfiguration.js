
var appConfig = function(){
    return {
        database : {
            URL : 'mongodb://localhost:27017/QAWeb'
        },
        amqpServer : {
            URL : 'amqp://localhost'
        },
        distributedMode : {
            isActive : false  //Set this to true, if Queue is been used to handle request parallel
        }
    };
};

module.exports.appConfig = appConfig();
