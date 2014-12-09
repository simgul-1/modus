var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UploadSchema = new Schema({
	data 			:[],
	path 			:String,
	filename		:String,
	creation_time 	:Date,
	movie_title 	:String,
	user			:String
	
})
module.exports = mongoose.model('Upload',UploadSchema);