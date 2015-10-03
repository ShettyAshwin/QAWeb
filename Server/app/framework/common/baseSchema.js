var baseframework = require('../common/baseMongoose');

//Schema definition for the QAWeb
var hospitalSchema = new baseframework.mongoose.Schema({name: String, address: String, LocationId : [{type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Location'}]});
var locationSchema = new baseframework.mongoose.Schema({name: String, address: String, hospitalId : {type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Hospital'}, hierarchyId : [{type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Hierarchy'}]});
var hierarchySchema = new baseframework.mongoose.Schema({name: String, address: String, order : Number, locationId : {type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Location'}, assetId : [{type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Asset'}]});
var assetSchema = new baseframework.mongoose.Schema({name: String, properties: [{name : String, value:String}], hierarchyId : {type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Hierarchy'}});

var Factory = {
    getHospitalInstance : function(){
        return  baseframework.mongoose.model('Hospital', hospitalSchema);
    },
    getLocationInstance : function(){
        return baseframework.mongoose.model('Location', locationSchema);
    },
    getHierarchyInstance : function(){
        return baseframework.mongoose.model('Hierarchy', hierarchySchema);
    },
    getAssetInstance : function(){
        return baseframework.mongoose.model('Asset', assetSchema);
    }
}

module.exports.Factory = Factory;
