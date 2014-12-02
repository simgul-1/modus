var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParseSchema = new Schema({
	data 		:[],
	name 		:String,
	created 	:Date,
	movie_title :String
	
})
module.exports = mongoose.model('Parse',ParseSchema);