var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    prodName:String,
    valor:Number,

});

module.exports = mongoose.model('Product', productSchema);
