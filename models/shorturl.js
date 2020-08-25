var mongoose = require('mongoose');
var shorturlSchema = new mongoose.Schema({
    shorturl: {type:String, require:true},
    rawurl: {type:String, require:true}
});

module.exports = mongoose.model('shorturl', shorturlSchema);