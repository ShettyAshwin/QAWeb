var baseframework = require('../common/baseMongoose');

var hierarchySchema = new baseframework.mongoose.Schema({name: String, address: String, order : Number, location : {type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Location'}});
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
    getAll : function(res){
        console.log('GetAll executed');
        this.connectDB();
        hierarchyModel.find({}).populate('Location').exec(
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            });
    },
    getById : function(id,res, next){
        console.log('Get by Name executed');
        this.connectDB();
        hierarchyModel.findOne(id).populate('location').exec(
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            });
    },
    deleteById :function(id,res, next){
        console.log('Delete by Name executed');
        this.connectDB();
        hierarchyModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) return next(err);
                res.json(baseframework.statusOk);
                res.end();
            }
        );

    },
    add :function(hierarchy, res, next){
        console.log('Add new Hospital');
        if((hierarchy) && (hierarchy.name.length) && hierarchy.name.length > 0 && (hierarchy.address) && hierarchy.address.length > 0 && (hierarchy.location) && hierarchy.location.length > 0){
            this.connectDB();
            hierarchyModel.create(location,
                function (err, post) {
                    if (err) return next(err);
                    res.json(baseframework.statusOk);
                    res.end();
                }
            );
            //res.json(statusOk);
        }else{
            res.json(baseframework.statusError);
            res.end();
        }
    },
    update : function(id, location, res, next){
        console.log('Update existing location');
        //validate hospital
        if((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospitalId) && location.hospitalId.length > 0){
            this.connectDB();
            //hospitalModel.push(hospital);

            locationModel.findByIdAndUpdate(id, location,
                function (err, post) {
                    if (err) return next(err);
                    res.json(statusOk);
                    res.end();
                }
            );

        }else{
            res.json(baseframework.statusError);
            res.end();
        }

    }
}

module.exports.clsHierarchy = clsHierarchy;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;