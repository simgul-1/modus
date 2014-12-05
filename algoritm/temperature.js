module.exports = function(app) {
	var Parse = require('../app/models/parse');
	var mongoose = require('mongoose');




app.get('/algo/:parse_id',function(req,res){

	//p = new Parse();
	Parse.findById(req.params.parse_id,function(err,parse){
		if(err)
			res.send(err);

		var data = parse.data;
		var Average = Aver(data);
		var min = findMin(data);
		var max = findMax(data);

		console.log("Average: " + Average + " Max: " +max + " Min: " +min);


		//skit


		  //db.collectionNames(function(err, collections){
		    //  console.log(collections);
		      
		      //var test = db.collections('test');
		      //console.log(test);


	});


});

app.get('/algo',function(req,res){
	
	Parse.find({filename: 'TEMP.csv'}, function(err, info){
		info.forEach(function(object){
			var data = object.data;
			var min = findMin(data);
			console.log(min);
		})
		
	});






	

		res.send(info);
	});













//Function for finding smallest value in csv. 
function findMin(array){
	var min = array[1];
	for( i=0; i < array.length;i++){
			//skipping first line and looking for smallest value
		if(i != 0 && min > array[i]){
			min = array[i];
		}

	}
	return min; 
}

//Function for finding Biggest value in csv. 
function findMax(array){
	var big = array[1];
	for(i=0; i < array.length;i++){
			//skipping first line and looking for smallest value
		if(i != 0 && big < array[i]){
			big = array[i];
		}

	}
	return big; 
}


//Function for finding Average value in csv. 
function Aver(array){
	var Average = 0;
	for(i=0; i < array.length;i++){
			//skipping first line. 
		if(i != 0){
			console.log(array[i]);
			Average = Average + parseFloat(array[i]);
		}
	}
	Average = Average/(array.length-1);
	return Average;
}

function Average(array){
	console.log(parseFloat(array[1]));
}

}