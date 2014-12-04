var Parse = require('../app/models/parse');
//Requirements
fs = require('fs');
require('should');
var parse = require('csv-parse');




//Choose file to parse.
	BPMm = '../tmp/BPM.csv'


//PARSAR
stream = fs.createReadStream(__dirname + '/'+ BPMm);
var parser = parse({delimiter: ','}, function(err, data){

//STOPPA IN SKITEN I DATABASEN
var parse = new Parse({
	data : data,
	created 	: Date.now(),
	name		: BPMm 
	});
parse.save(function(err){
	if(err)
		res.send(err);
	console.log('Data saved from ' + BPMm)
});

console.log();
console.log('----------Heartbeat BPM ----------');
//GET AVERAGE
var Average = Aver(data);
console.log("Average heartbeat: " + Average);

//BPM, finding "high rises", indicating something
var count = BPM(data,Average);
console.log(count);

//SORT
var sorted = data.sort();
//GET MINIMUM VALUE
var minimum  = sorted[0];
console.log("Minimum heartbeat: " + minimum);

//GET MAXIMUM VALUE
var maximum = sorted.pop();
console.log("Maximum: heartbeat " + maximum);





});
stream.pipe(parser);


//PARSER SLUTAR HÄR



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
	var time =1;
	var info = [];
function BPM (array,average){
	for( var i in array){
		var curr = array[i]
		var current = array[i]*diff;
		var previous= array[i-1]*diff;
		if((current > average)){
			info.push([parseInt(curr),time]);

		 }
		time++;
	}		
	return info;
	
}
