var baseframework = require('../common/baseMongoose');
var Q = require('q');

var hierarchySchema = new baseframework.mongoose.Schema({name: String, address: String, order : Number, locationId : {type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Location'}});
var hierarchyModel = baseframework.mongoose.model('Hierarchy', hierarchySchema);

var clsHierarchy  = {
    connectDB : function(){
        baseframework.mongoose.connect(baseframework.dbServer,function(error){
            if(error){
                console.log(error);
            }
        });
    },
    disconnectDB :function(){

    },
    responseHandler : function (err, obj){
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', obj);
        }
    },
    addDummy : function(res){
        this.connectDB();
        var hierarchy1 = new hierarchyModel({name: 'Hierachy1', address :'Dummy Address 1'});
        var hierarchy2 = new hierarchyModel({name: 'Hierachy2', address :'Dummy Address 2'});
        var hierarchy3 = new hierarchyModel({name: 'Hierachy2', address :'Dummy Address 2'});

        hierarchy1.save(function (err, data) {
            clsHierarchy.responseHandler(err,data);
        });
        hierarchy2.save(function (err, data) {
            clsHierarchy.responseHandler(err,data);
        });
        this.disconnectDB();
        res.json(baseframework.statusOk);
        res.end();
        //mongoose.connection.close();
    },
    getAll : function(){
        console.log('GetAll executed');
        this.connectDB();
        var defer = Q.defer();
        hierarchyModel.find({}).populate('Location').exec(
            function (err, data) {
                if (err) {
                    throw err;
                }
                defer.resolve(data);
            });
        return defer.promise;
    },
    getById : function(id){
        var defer = Q.defer();
        console.log('Get by id executed');
        this.connectDB();
        hierarchyModel.findById(id).populate('location').exec(
            function (err, data) {
                if (err) {
                    throw err;
                }
                defer.resolve(data);
            });
        return defer.promise;
    },
    getByLocationId : function(id){
        var defer = Q.defer();
        console.log('Get by Name executed');
        this.connectDB();
        hierarchyModel.find({locationId:id}).populate('location').exec(
            function (err, data) {
                if (err) {
                    throw err;
                }
                defer.resolve(data);
            });
        return defer.promise;
    },
    deleteById :function(id){
        var defer = Q.defer();
        console.log('Delete by Name executed');
        this.connectDB();
        hierarchyModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) {
                    throw err;
                }
                defer.resolve(baseframework.statusOk);
            }
        );
        return defer.promise;

    },
    add :function(hierarchy){
        var defer = Q.defer();
        console.log('Add new Hospital');
        if((hierarchy) && (hierarchy.name.length) && hierarchy.name.length > 0 && (hierarchy.address) && hierarchy.address.length > 0 && (hierarchy.locationId) && hierarchy.locationId.length > 0){
            this.connectDB();
            hierarchyModel.create(hierarchy,
                function (err, post) {
                    if (err) {
                        throw err;
                    }
                    defer.resolve(baseframework.statusOk);
                }
            );
        }else{
            defer.resolve(baseframework.statusError);
        }

        return defer.promise;
    },
    update : function(id, hierarchy){
        var defer = Q.defer();
        console.log('Update existing hierarchy');
        //validate hospital
        if((hierarchy) && (hierarchy.name.length) && hierarchy.name.length > 0 && (hierarchy.address) && hierarchy.address.length > 0 && (hierarchy.locationId) && hierarchy.locationId.length > 0){
            this.connectDB();
            hierarchyModel.findByIdAndUpdate(id, hierarchy,
                function (err, post) {
                    if (err) {
                        throw err;
                    }
                    defer.resolve(baseframework.statusOk);
                });

        }else{
            defer.resolve(baseframework.statusError);
        }
        return defer.promise;
    }
}

module.exports.clsHierarchy = clsHierarchy;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;