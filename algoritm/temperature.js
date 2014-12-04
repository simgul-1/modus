var Parse = require('../app/models/parse');

//Requirements
fs = require('fs');
require('should');
var parse = require('csv-parse');

//Choose file to parse.
temp = '../tmp/TEMP.csv'

//PARSAR
stream = fs.createReadStream(__dirname + '/'+ temp);
var test=[];
var parser = parse({delimiter: ','}, function(err, data){

//STOPPA IN SKITEN I DATABASEN
var parse = new Parse({
	data : data,
	created 	: Date.now(),
	name		: temp
	});
//console.log(data);
parse.save(function(err){
	if(err)
		res.send(err);
	console.log('Data saved from ' + temp)
});

console.log();
console.log('---------- Temperature TEMP ----------')
//GET AVERAGE
var Average = Aver(data);
console.log("Average temperature: " + Average);

//GET MINIMUM VALUE
var minimum  = findMin(data);
console.log("Minimum temperature: " + minimum);

//GET MAXIMUM VALUE
var maximum = findMax(data);
console.log("Maximum Temperature: " + maximum);

//temp
var count = TEMP(data,Average);
console.log("temperature over average");
console.log(count[0]);
console.log(count[500]);



});
stream.pipe(parser);


//PARSER SLUTAR HÄR

//Function for finding smallest value in csv. 
function findMin(array){
	var min = array[1];
	var count=0;
	for( var i in array){
			//skipping first line and looking for smallest value
		if(i >0 && min > array[i]){
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
//Capture temperature when its over average
	var time =0;
	var info = [["Temp","Time","Over Average"]];
function TEMP (array,average){
	for( var i in array){
		var current = array[i]
		if(current > average){
			info.push([parseFloat(current),time,true]);

		 }
		time++;
	}		
	return info;
	
}