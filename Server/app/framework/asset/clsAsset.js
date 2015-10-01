var baseframework = require('../common/baseMongoose');

//var hospitalSchema = new baseframework.mongoose.Schema({name: String, address: String});
//var hospitalModel = baseframework.mongoose.model('Hospital', hospitalSchema);

var assetSchema = new baseframework.mongoose.Schema({name: String, properties: [{name : String, value:String}], HierarchyId : {type: baseframework.mongoose.Schema.Types.ObjectId, ref:'Hierarchy'}});
var assetModel = baseframework.mongoose.model('asset', assetSchema);

var clsAsset  = {
    connectDB : function(){
        baseframework.mongoose.connect(baseframework.dbServer,function(error){
            if(error){
                console.log(error);
            }
        });
    },
    disconnectDB :function(){

    },
    responseHandler : function (err, asset){
        if (err) {
            console.log(err);
        } else {
            console.log('saved successfully:', asset);
        }
    },
    addDummy : function(res){
        this.connectDB();
        var asset1 = new assetModel({name: 'asset1', properties :[{ name: 'p1', value:'v1'},{name : 'p1', value:'v2'}]});
        var asset2 = new assetModel({name: 'asset1', properties :[{ name: 'p11', value:'v11'},{name : 'p11', value:'v21'}]});
        var asset3 = new assetModel({name: 'asset1', properties :[{ name: 'p111', value:'v111'},{name : 'p111', value:'v211'}]});

        asset1.save(function (err, asset) {
            clsAsset.responseHandler(err,asset);
        });
        asset2.save(function (err, asset) {
            clsAsset.responseHandler(err,asset);
        });
        asset3.save(function (err, asset) {
            clsAsset.responseHandler(err,asset);
        });
        this.disconnectDB();
        res.json(baseframework.statusOk);
        res.end();
        
    },
    getAll : function(res){
        console.log('GetAll executed');
        this.connectDB();
        assetModel.find({},function(err,docs){
            console.log('dataFetch');
            res.json(docs);
            res.end();
        });
    },
    getById : function(id,res, next){
        console.log('Get by Name executed');
        this.connectDB();
        assetModel.findById(id,
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            }
        );
    },
    deleteById :function(id,res, next){
        console.log('Delete by Name executed');
        this.connectDB();
        
        assetModel.findByIdAndRemove(id,
            function (err, post) {
                if (err) return next(err);
                res.json(baseframework.statusOk);
                res.end();
            }
        );

    },
    add :function(asset, res, next){
        console.log('Add new asset');
        if((asset) && (asset.name.length) && asset.name.length > 0){
            this.connectDB();
            //assetModel.create(asset);
            assetModel.create(asset,
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
    update : function(id, asset, res, next){
        console.log('Update existing asset');
        //validate asset
        if((asset) && (asset.name.length) && asset.name.length > 0 ){
            this.connectDB();
            //assetModel.push(asset);

            assetModel.findByIdAndUpdate(id, asset,
                function (err, post) {
                    if (err) return next(err);
                    res.json(baseframework.statusOk);
                    res.end();
                }
            );

        }else{
            res.json(baseframework.statusError);
            res.end();
        }

    },
    getByHierarchyId : function(id,res, next){
        console.log('Get by Name executed');
        this.connectDB();
        assetModel.find({HierarchyId:id}).populate('Hierarchy').exec(
            function (err, data) {
                if (err) return next(err);
                res.json(data);
                res.end();
            });
    }
};

module.exports.clsAsset = clsAsset;
module.exports.statusOk = baseframework.statusOk;
module.exports.statusError = baseframework.statusError;