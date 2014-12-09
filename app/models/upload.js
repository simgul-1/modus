var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UploadSchema = new Schema({
	data 			:[],
	filename		:String,
	creation_time 	:Date,
	imdb_id			:String,
	user_id			:String
	
})
module.exports = mongoose.model('Upload',UploadSchema);