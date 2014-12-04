var Parse = require('../app/models/parse');

//Requirements
fs = require('fs');
require('should');
var parse = require('csv-parse');

//Choose file to parse.
	BVP = '../tmp/BVP.csv'


//PARSAR
stream = fs.createReadStream(__dirname + '/'+ BVP);
var parser = parse({delimiter: ','}, function(err, data){

//STOPPA IN SKITEN I DATABASEN
var parse = new Parse({
	data : data,
	created 	: Date.now(),
	name		: BVP 
	});
parse.save(function(err){
	if(err)
		res.send(err);
	console.log('Data saved from ' + BVP)
});

console.log();
console.log('----------BloodVolumePulse BVP ----------');
//GET AVERAGE
var Average = 0;
console.log("Average BVP: " + Average);
var count = BVPp(data,Average);
console.log(count);

//Finding "high rises and low drops to identifiy moode changes"



});
stream.pipe(parser);


//PARSER SLUTAR HÄR

//Function for finding smallest value in csv. 
function findMin(array){
	var min = array[1];
	for( var i in array){
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
	for( var i in array){
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
	for( var i in array){
			//skipping first line. 
		if(i != 0){
			Average = Average + parseFloat(array[i]);
		}
	}
	Average = Average/(array.length-1);
	return Average;
}

//BPM
//Finding highrises in the csv file, resulting in array with [heartbeatvalue,time of event]
	var counter = 0;
	var diff =0.85;
	var time =0;
	var info = [["Spikes","Time"]];
function BVPp (array,average){
	for( var i in array){
		var curr = array[i]
		var current = array[i]*diff;
		var previous= array[i-1]*diff;
		if((current > average) && (previous < current*0.8)){
			counter++;
			info.push([parseInt(curr),time]);

		 }
		time++;
		i=i+36.3678
	}		
	return time;
	
}