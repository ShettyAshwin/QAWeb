var baseframework = require('../common/baseMongoose');

var locationSchema = new baseframework.mongoose.Schema({name: String, address: String, hospital : {type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Hospital'}});
var locationModel = baseframework.mongoose.model('Location', locationSchema);

var clsLocation  = {
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
        var location1 = new locationModel({name: 'Mumbai', address :'Maharashtra, India'});
        var location2 = new locationModel({name: 'Pune', address :'Maharashtra, India'});

        location1.save(function (err, data) {
            clsLocation.responseHandler(err,data);
        });
        location2.save(function (err, data) {
            clsLocation.responseHandler(err,data);
        });
        this.disconnectDB();
        res.json(statusOk);
        res.end();
        //mongoose.connection.close();
    },
    getAll : function(res){
        console.log('GetAll executed');
        this.connectDB();
        locationModel.find({}).populate('Hospital').exec(
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            });
        /*locationModel.find({},function(err,docs){
         docs.forEach(function(item){
         hospitalModel.find({_id : item.hospitalId},function(err,hospital){
         if((hospital) && hospital.length > 0){
         item.Hospital = hospital[0];
         }
         });
         });
         res.json(docs);
         res.end();
         });*/
    },
    getById : function(id,res, next){
        console.log('Get by Name executed');
        this.connectDB();
        locationModel.findOne(id).populate('Hospital').exec(
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            });
    },
    deleteById :function(id,res, next){
        console.log('Delete by Name executed');
        this.connectDB();
        locationModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) return next(err);
                res.json(statusOk);
                res.end();
            }
        );

    },
    add :function(location, res, next){
        console.log('Add new Location');
        if((location) && (location.name.length) && location.name.length > 0 && (location.address) && location.address.length > 0 && (location.hospital) && location.hospital.length > 0){
            this.connectDB();
            locationModel.create(location,
                function (err, post) {
                    if (err) return next(err);
                    res.json(statusOk);
                    res.end();
                }
            );
            //res.json(statusOk);
        }else{
            res.json(statusError);
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
            res.json(statusError);
            res.end();
        }

    }
};

module.exports.clsLocation = clsLocation;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;
