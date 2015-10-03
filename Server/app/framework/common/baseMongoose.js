var mongoose = require('mongoose');
var config = require('../../appConfiguration').appConfig;

var dbServer = config.database.URL;
var statusOk = {status:'200', detail :''};
var statusError =  {status :'500', detail :''};

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbServer);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports.connect = function(){
    mongoose.connect(dbServer,function(error){
        if(error){
            console.log(error);
        }
    });
};

module.exports.close = function(){
    //mongoose.connection.close();
};

module.exports.mongoose = mongoose;
module.exports.statusOk = statusOk;
module.exports.statusError = statusError;
module.exports.dbServer = dbServer;

