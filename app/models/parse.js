var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParseSchema = new Schema({
	data 			:[],
	path 			:String,
	filename		:String,
	creation_time 	:Date,
	movie_title 	:String
	
})
module.exports = mongoose.model('Parse',ParseSchema);