var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UploadSchema = new Schema({
	bpmdata 		:[],
	bpmvalue		:String,
	creation_time 	:Date,
	imdb_id			:String,
	user_id			:String,
	filepath		:String
	
})
module.exports = mongoose.model('Upload',UploadSchema);