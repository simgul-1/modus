module.exports = function(app) {
	var Upload = require('../app/models/upload');
	var mongoose = require('mongoose');




app.get('/algo/:upload_id',function(req,res){

	//p = new Parse();
	Upload.findById(req.params.upload_id,function(err,Upload){
		if(err)
			res.send(err);

		// Om exakt denna ska användas behöver vi user och movie.
		var data = upload.data;
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



	Parse.find({filename: 'IBI.csv'}, function(err, info){
		//data goes here
		var data = []
		count=0;
		//IBI TO BPM 
		res.send(info);
		info.forEach(function(object){
			var val = object.data;
			val.forEach(function(IBI){
				BPM = (60/IBI[1])
				data.push(BPM);
			})
	

		var min = findMin(data);
		var max = findMax(data);
		var average = findAverage(data);
		var high = findRise(data,average);

		//get time
		var temp = val.pop();
		var time = (temp[0]/60);	
		var result = (time/parseFloat(high));

		console.log("Min: "+ min);
		console.log("Max: "+ max);
		console.log("Average: "+ average);
		console.log("highrises: "+ high.length);
		console.log("Resultfactor: "+ result);
		console.log("");

		})
		console.log('hej');

		
	});






	

		
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
function findAverage(array){
	var Average = 0;
	for(i=0; i < array.length;i++){
			//skipping first line. 
		if(i != 0){
			Average = Average + parseFloat(array[i]);
		}
	}
	Average = Average/(array.length-1);
	return Average;
}


//Finding highrises in the csv file, resulting in array with [heartbeatvalue,time of event]
function findRise (array,average){
	var counter = 0;
	var diff =0.85;
	var time =1;
	var info = [];
	for( var i in array){
		var curr = array[i]
		var current = array[i]*diff;
		var previous= array[i-1]*diff;
		if((current > average) && previous <current*diff){
			info.push([parseInt(curr)]);

		 }
		time++;
	}		
	return info;
	
}

}