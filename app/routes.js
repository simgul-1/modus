module.exports = function(app, passport) {

// normal routes ===============================================================
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	var fs = require('fs');
	var Upload = require('../app/models/upload');
	var flash = require('connect-flash');
	var omdb = require('omdb');
	var session = require('express-session');
	var request = require('request');
	var mdb = require('moviedb')('3e5eb7fc233740076d8b3044de9ef228');

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		// Sessions to register what to send user to after login etc.
		req.session.lastPage = "/";

		res.render('pages/index.ejs', {
			user : req.user
		}); 
	});
	
	// show the home page (will also have our login links)
	app.get('/about', function(req, res) {
		// Sessions to register what to send user to after login etc.
		req.session.lastPage = "/about";

		res.render('pages/about.ejs', {
			user : req.user
		});
	});
	
	// show the home page (will also have our login links)
	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		// Sessions to register what to send user to after login etc.
		req.session.lastPage = "/profile";

		res.render('pages/profile.ejs', {
			user : req.user
		});
	});
	
	
	// // PROFILE SECTION =========================
	app.get('/myuploads', isLoggedIn, function(req, res) {
		

		// Sessions to register what to send user to after login etc.
		req.session.lastPage = "/myuploads";

		// Determine user_id
		if(req.user.facebook.id) {
	    	var userid = req.user.facebook.id;
	    }
	    else if(req.user.google.id) {
	    	var userid = req.user.google.id;
	    }

	   	getUploadedMovies(userid, function(info){
			
			console.log('Got uploaded movies for user '+userid);
			res.render('pages/myuploads.ejs', { data: info, user: req.user });
			
		});
	 
		
	});

	app.get('/myotheruploads', function(req, res){

		res.render('pages/myotheruploads.ejs', { user : req.user });
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// // GRAPH ==============================
	// app.get('/graph', function(req, res) {
		
	// 	res.render('pages/algo.ejs');
	// });

	// POST REQUEST TO GENERAL SEARCH 
	app.post('/search', function(req, res) {

		var title = req.body.title;
		allmovies = [];
		movieposter = [];
		movieresult = [];
		
		searchForMovies(title, function(movies) {
			
			function serien(arg){

				if(arg){
					//console.log('ARG COMES HERE ====================');
					//console.log(arg);
					//console.log('==========================');

					
					// getPoster(arg.imdb_id, function(poster){
							
						//console.log('Posterpath for '+arg.title+' = '+poster);
							
						movieresult.push({
							"title" : arg.title,
							"year" : arg.year,
							"imdb_id" : arg.imdb_id,
							//"poster_path" : poster
						});
					
					serien(movies.shift());
					
					// });
				}
				else{
					finale(movieresult);
				}

			}
			

			function finale(result){
				//console.log(result);
				//res.send(result);
				console.log('Done with API requests, redirecting to GET SEARCH');
				console.log('Got these results from API request');
				console.log(result);
				//res.redirect('/search', { moviedata : result, user : req.user });
				res.render('pages/search.ejs', { result: result, user: req.user });
			}
			
			// starts the function
			serien(movies.shift());

		});
		

	});

	// GET REQUEST TO SEARCH
	app.get('/search', function(req, res) {
		// Sessions to register what to send user to after login etc.
		req.session.lastPage = "/search";

		res.render('pages/search.ejs', { user: req.user });
		

	});


	

	//===============================================================================================================================
	app.get('/movie', function(req, res) {

		console.log('in /movie');
		// Sessions to register what to send user to after login etc.
		req.session.lastPage = "/movie?imdb_id="+req.query['imdb_id'];


		var imdb_id = req.query['imdb_id'];
		

		// Session to remember what user searched for
		//req.session.movie = title;

		// Gets the movie info for specific movie
		getMovieInfo(imdb_id, function(moviedata) {
			
			console.log('Done getting movie info, rendering page');
			
			res.render('pages/movie.ejs', { moviedata: moviedata, user: req.user });
			
		});
	});

	// ========================================================================
	// ==================================== API PART ==========================
	// ========================================================================
	app.get('/api/v1/movie', function(req, res) {

		var imdb_id = req.query['imdb_id'];

		// Gets the movie info for specific movie
		getMovieInfo(imdb_id, function(moviedata) {
			
			res.json(moviedata);
		
		});
		
	});

	app.post('/api/v1/search', function(req, res) {

		var title = req.body.title;

		// Gets the movie info for specific movie
		searchForMovies(title, function(movies){
			res.json(movies)
		});
		
	});

	app.get('/api/v1/uploads', function(req, res){

		getUploadedMovies(req.query.user_id, function(movies){
			res.json(movies);
		});

		
	});


	app.get('/api/v1/modusrating', function(req, res){

		imdb_id = req.query['imdb_id'];

		var result = [];
		
		getModusRating(imdb_id, function(data){
			
			console.log(data);
			//json = JSON.stringify(data);
			
			
			result.push({
				"imdb_id" 		: imdb_id,
				"modusvalue" 	: data.modusvalue,
				"contributors" 	: data.contributors
			});
			res.json(result);
		});

	});

	// UPLOAD ROUTE FOR API
	app.post('/api/v1/upload', function(req, res){
		
		//console.log('Uploading from API');
		
		// DOESNT WORK YET. SOLVE TOKEN BASED AUTHENTICATION WITH GOOGLE OAUTH/PASSPORT AND CLIENT.

		res.send(404);		
		// // gets the values from body and files (These needs to be set when sending to API also)
	 //    var tmp_path = req.files.modusdata.path;
	 //    var imdb_id = req.body.imdb_id;
	 //    var user_id = req.body.user_id;

		// upload_bpmvalue(tmp_path, imdb_id, user_id, function(){
		// 	res.send(200);
		// });

	});
	//=======================================================================================

	app.get('/audio', function(req, res) {
		// search specific song or audio
	});

	
	// Upload route
	app.post('/upload', multipartMiddleware, isLoggedIn, function(req, res) {

		// gets the values from body and files (These needs to be set when sending to API also)
	    var tmp_path = req.files.modusdata.path;
	    var imdb_id = req.body.imdb_id;
	    var user_id = req.userid

		upload_bpmvalue(tmp_path, imdb_id, user_id, function(){
			res.redirect(req.session.lastPage);
		});

	});
	

	// app.get('/upload_form', isLoggedIn, function(req, res) {

	// 	res.render('pages/upload_form.ejs');

	// });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/auth/success',
				failureRedirect : '/'
			}));

	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				// /auth/sucess is custom made and points user to lastpage
				successRedirect : '/auth/success',
				failureRedirect : '/'
			}));

		app.get('/auth/success', function(req, res) {
			console.log('In auth/success, redirecting to '+req.session.lastPage);
			res.set('token', req.token);
			res.redirect(req.session.lastPage || '/');
		});

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/auth/success',
				failureRedirect : '/'
			}));

	// google ---------------------------------

		// send to google to do the authentication
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		app.get('/connect/google/callback',
				passport.authorize('google', {
				successRedirect : '/auth/success',
				failureRedirect : '/'
			}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// facebook -------------------------------
	app.get('/unlink/facebook', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// google ---------------------------------
	app.get('/unlink/google', isLoggedIn, function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

// Takes title as argument, only returns actual movies
function searchForMovies(arg, callback){
	console.log('Getting movie for searchterm '+arg);

		omdb.search(arg, function(err, movies) {
		    if(err) {
		    	console.error(err);

		    	callback(500);
		    	return;
		    	
		    }
		    if(movies.length < 1) {
		        
		    	callback(404);
		    	return;

		    }	
		   	
		    var moviedata = [];
		    //var poster;
		    //console.log(movies);
		   	movies.forEach(function(movie) {
		    	
				// Check to see if "movie" is an episode or game, ensures TMDb API works
		        if(movie.type == "movie"){
				
					moviedata.push({
			        	
			        	"title" : movie.title,
			     		"year" : movie.year,
			     		"imdb_id" : movie.imdb,
			     		
			        });
		     	}
		     	
		     	else{
		     		console.log('Skipping '+movie.title+' reason type != movie');
		     	}

		    });

		    // Done with the API request
			callback(moviedata);
			return;
		});
}

function getUploadedMovies(user, callback){
	
	console.log('Getting Uploaded movies for user '+user);
	// "117455612749622948262"
	var allmovies = [];

	Upload.find({user_id : user}, function(err, uploaded_movies){
		
		function finale(){

			console.log('Done getting uploaded movies');
			callback(allmovies);
			return;
		}

		function serien(obj){
			
			if(obj){

				getMovieInfo(obj.imdb_id,function(movie){
			
					allmovies.push({
						
						"upload_id" 	: obj._id,
						"bpmvalue"  	: obj.bpmvalue,
						"creation_time" : obj.creation_time,
						"modusvalue" 	: modusvalue,
			     		"contributors"	: contributors,
						"filepath" 		: obj.filepath,
						"title" 		: movie.title,
			     		"year" 			: movie.year,
			     		"plot" 			: movie.plot,
			     		"imdb_rating" 	: movie.imdb_rating,
			     		"imdb_votes" 	: movie.imdb_votes,
			     		"runtime" 		: movie.runtime,
			     		"actors" 		: movie.actors,
			     		"director" 		: movie.director,
			     		"writers" 		: movie.writers,
			     		"imdb_id" 		: movie.imdb_id,
			     		
					});
					//console.log(allmovies);
					serien(uploaded_movies.shift());
				});
				
			}
			else{
				return finale();
			}
		}
		serien(uploaded_movies.shift());

	});
}

// app.get('/lol', function(req, res){
// 	getUploadedMovies("117455612749622948262", function(hej){
// 		res.json(hej);
// 	});
// });

function getMovieInfo(imdb_id, callback) {
	
	console.log('Getting movieInfo for '+imdb_id);
	
	omdb.get(imdb_id, true, function(err, movie){
		
		console.log('getting info for '+movie.title);

		if(err) {
			return console.log(err);
		}

		if(!movie) {
			return console.log('No movie found');
		}

		
		getModusRating(imdb_id, function(modusdata){
			if(modusdata){

				modusvalue = modusdata.modusvalue.toPrecision(3);
				contributors = modusdata.contributors;
				
			}
			else{
				bpmvalue = 0;
				contributors = 0;
			}
			var moviedata = {
	        	"title" 		: movie.title,
	     		"year" 			: movie.year,
	     		"plot" 			: movie.plot,
	     		"imdb_rating" 	: movie.imdb.rating,
	     		"imdb_votes" 	: movie.imdb.votes,
	     		"runtime" 		: movie.runtime,
	     		"actors" 		: movie.actors,
	     		"director" 		: movie.director,
	     		"writers" 		: movie.writers,
	     		"imdb_id" 		: movie.imdb.id,
	     		"modusvalue" 	: modusvalue,
	     		"contributors"	: contributors

			};
		  	//console.log(moviedata);
		  	callback(moviedata);
			return;	
		});

			
			

		
	    
	});
}

function getModusRating(arg, callback){
	console.log('in getModusRating');

	Upload.find({imdb_id : arg}, function(err, info){
		
		//console.log('info comes here '+info);
		//console.log(typeof(info));

		if(err){
			console.log(err);
		}
		
		else{
			
			var totalmodusvalue = 0;
			var contributors = 0;
			info.forEach(function(object){
				
				bpmvalue = parseFloat(object.bpmvalue);
				//console.log('BPM value = '+bpmvalue);
				totalmodusvalue += bpmvalue;
				contributors++;
				//console.log(values);
			});
			
			var averageModusValue = totalmodusvalue/contributors;

			console.log('contributors = '+contributors);
			console.log('totalmodusvalue = '+totalmodusvalue);
			console.log('average modusvalue = '+averageModusValue);
			
			var jsonstring = {
				"modusvalue" 	: averageModusValue,
				"contributors"	: contributors
			};
			
			callback(jsonstring);
			return;
		}

		
	})
}


// NOT WORKING YET! NEEDS IMDB_ID AND USER AND PROBABLY MORE STUFF.
// CHECK FOR ERRORS AND GIVE CORRECT RESPONSES

function upload_bpmvalue(tmp_path, imdb_id, user_id, callback){
	require('should');

		//Parsing function
	    var parse = require('csv-parse');
	   
	    var filename = Math.random()+'.csv';
	    var path = 'public/uploads/'+filename;
	   	var dbpath = '/uploads/'+filename;
	   	
	   	// DONT ACCEPT UPLOAD IF NOT .CSV.
	   	// FIX FUNCTION TO UNZIP AND USE THE FILE NAMED IBI.CSV

	   	fs.readFile(tmp_path, function(err, data){
	   		fs.writeFile(path, data, function(err){
				
				if(err) throw err;
				console.log('uploaded file as: '+path);
				console.log('Should uploaded the file by now...');
				
				//PARSAR IGENOM FILEN
			    stream = fs.createReadStream(tmp_path);

				var parser = parse({delimiter: ','}, function(err, bpmdata){

				    // HANDLE DATA WITH BPMParse
				    var bpmvalue = BPMParse(bpmdata);

				   	console.log('Parse done, moving on to save..');
				    console.log()
				   
				    console.log('user_id = '+user_id);
				    
				    //STOPPA IN SKITEN I DATABASEN
				    var upload = new Upload({
				      	bpmdata : bpmdata,
				      	bpmvalue : bpmvalue,
				      	creation_time : Date.now(),
				      	imdb_id : imdb_id,		
				      	user_id: user_id,
				      	filepath : dbpath
				      
				    });
				    
				    upload.save(function(err){
					    if(err){
					     	res.send(err);
					    }
					    else{
					    	console.log('Data uploaded successfully to '+path);
			 			}
				    });
				    // Unlinks the file in /tmp
					fs.unlink(tmp_path, function (err) {
	  					if (err) throw err;
	  				console.log('successfully deleted '+tmp_path);
					});
				    
				});
			    stream.pipe(parser);
			    
			    callback();
			});
		});
	}


	// PARSES ONLY YOUR UPLOADED DATA FOR ONE MOVIE
	function BPMParse(array, callback){
		var array = JSON.parse(JSON.stringify(array));
		console.log(array[0] + " " + array[1] );

		//contain only BPM
		bpmdata = []

		//Getting 2:d value from IBI to convert IBI to BPM. 
		for(var i in array){
			IBI = array[i];
			BPM = (52/IBI[1]);
			bpmdata.push(BPM);
		}

		//Get time in minutes.
		temp = array.pop();
		var timeend = temp[0];
		var duration = timeend/60;
		
		var min = findMin(bpmdata);
		var max = findMax(bpmdata);
		var average = findAverage(bpmdata);
		var rise = findRise(bpmdata,average).length;
		var bpmvalue = parseFloat(duration/rise);

		console.log("Minimum: " + min);
		console.log("Maximum: " + max);
		console.log("Average: " + average);
		console.log("Rises: " + rise);
		console.log("Time(m): " +duration);

		//console.log(' WANT TO RETURN TOT 3');
		
		return (bpmvalue);

	}

	function findUserID(callback){
		if(req.user.facebook.id) {
			var userid = req.user.facebook.id;
	    }
		else if(req.user.google.id) {
		   	var userid = req.user.google.id;
		}
		callback(userid);
		return;
	}

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

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

