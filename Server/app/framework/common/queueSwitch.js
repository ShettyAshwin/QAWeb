
//Set this to true, if Queue is been used.
//This logic is been added to facilitate local development, where developer can set this to false so that can execute complete request in one go.
var config = require('../../appConfiguration').appConfig;

var useQueueLogic = config.distributedMode.isActive;

if(useQueueLogic === true){
    console.log("");
    console.log("");
    console.log("[X] ********************************************************** [X]");
    console.log("[X] ********************************************************** [X]");
    console.log("[X] *************** distributed Mode is Active *************** [X]");
    console.log("[X] **** Verify Other process are Connected to Queue ********* [X]");
    console.log("[X] ********************************************************** [X]");
    console.log("[X] ********************************************************** [X]");
    console.log("");
    console.log("");
}

module.exports.isQueueEnabled = function(){
    if(useQueueLogic === true){
        return "QueuePub";
    }else{
        return "";
    }
}
