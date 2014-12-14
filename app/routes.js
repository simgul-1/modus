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

	   
	    allinfo = [];
		movieinfo = [];
		modusdata = [];
		i = 0;
	    
	    //console.log(userid);
	    getUploadedMovies(userid, function(modusinfo){
			
			console.log('Got uploaded movies for user '+userid);

			function final(){
	    		
				movieinfo.forEach(function(object){
					//console.log(modusdata.id);
					// Function to convert string value in "bpmvalue" to precision 3
					bpmvalue = parseFloat(modusdata[i].bpmvalue).toPrecision(3);
					console.log(object);
					allinfo.push({
						"upload_id" : modusdata[i]._id,
						"title" : object.title,
						"year" : object.year,
						"bpmvalue" : bpmvalue,
						"poster_path" : object.poster_path,
						"bpmdata" : modusdata[i].bpmdata
					})
					//console.log(allinfo);
<<<<<<< HEAD
					
=======
>>>>>>> 10e6fa37b1c69147846d65fdff27c6fc37e34b7f
					i++;
					
				});
				//res.send(allinfo);
				res.render('pages/myuploads.ejs', { data: allinfo, user: req.user });
	    	}
			
			function series(obj){
				//console.log(modusinfo);
				modusdata.push(obj);

				if(obj){
					getMovieInfo(obj.imdb_id, function(omdb, poster){
						
						omdb = JSON.parse(JSON.stringify(omdb));
<<<<<<< HEAD
						
=======
						//console.log('omdb.title');
						//console.log(omdb);
>>>>>>> 10e6fa37b1c69147846d65fdff27c6fc37e34b7f
						movieinfo.push({
						    "title" : omdb[0]['title'],
						    "year" : omdb[0]['year'],
						    "rating" : omdb[0]['rating'],
						    "poster_path" : poster

						});
						
						return series(modusinfo.shift());
					
					});
				}
				else{
					return final();
				}
			}

			series(modusinfo.shift());

		});
	 
		
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
		
		getMovies(title, function(movies) {
			
			function serien(arg){

				if(arg){
					//console.log('ARG COMES HERE ====================');
					//console.log(arg);
					//console.log('==========================');

					
					getPoster(arg.imdb_id, function(poster){
							
						console.log('Posterpath for '+arg.title+' = '+poster);
							
						movieresult.push({
							"title" : arg.title,
							"year" : arg.year,
							"imdb_id" : arg.imdb_id,
							"poster_path" : poster
						});
					
					serien(movies.shift());
					
					});
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
		getMovieInfo(imdb_id, function(moviedata, poster) {
			
			console.log('Done getting movie info, rendering page');
			moviedata = JSON.parse(JSON.stringify(moviedata));
			
			moviedata.forEach(function(object){
				imdbid = object.imdb_id;
				//console.log(imdbid);
			})
			// Clearing previous sessions
	    	req.session.moviedata = null;
	    	req.session.imdbid = null;

			// Saving sessions
			req.session.imdbid = imdbid;
			req.session.moviedata = moviedata;
			
			console.log('poster path is '+poster);
			// Gets the modus data for specific movie
			ModusCollect(req.session.imdbid, function(data){
				
				var modusdata = data.modusdata.toPrecision(3);
				var counter = data.counter;

				console.log('Modusdata from BPMParse = '+modusdata+' by '+counter+' persons');
				
				// FUNCTION TO GET MEDIUM VALUE FROM ALL MODUS RESULTS FOR SPECIFIC MOVIE


				// Renders the page
				res.render('pages/movie.ejs', { moviedata: moviedata, poster : poster, modusdata : modusdata, counter: counter, user: req.user });
			
			});


			
			
		});
		
	});

	app.get('/audio', function(req, res) {
		// search specific song or audio
	});

	
	// Upload route
	app.post('/upload', multipartMiddleware, isLoggedIn, function(req, res) {

		console.log('uploading');
		
		require('should');

	    //Parsing function
	    var parse = require('csv-parse');
	    var csv_file = req.files.modusdata.path;
	    var csv_name = req.files.modusdata.name;
	    console.log(csv_file);
	    console.log('CSV uploaded, moving on to parse...');

	    //PARSAR IGENOM FILEN
	    stream = fs.createReadStream(csv_file);

	    var parser = parse({delimiter: ','}, function(err, bpmdata){

	    // HANDLE DATA WITH BPMParse
	    var bpmvalue = BPMParse(bpmdata);
	    console.log("BPMDATA LALLA: "+ bpmdata);
	    //get tot


	    console.log('Parse done, moving on to save..');
	    console.log()
	    if(req.user.facebook.id) {
	    	var userid = req.user.facebook.id;
	    }
	    else if(req.user.google.id) {
	    	var userid = req.user.google.id;
	    }
	    // Getting IMDb_id from sessions
	    imdbid = req.session.imdbid;

	    console.log('user_id = '+userid);
	    console.log('imdb_id = '+imdbid);


	    //STOPPA IN SKITEN I DATABASEN
	    var upload = new Upload({
	      	bpmdata : bpmdata,
	      	bpmvalue : bpmvalue,
	      	creation_time : Date.now(),
	      	imdb_id : imdbid,		
	      	user_id: userid
	      
	    });
	    upload.save(function(err){
	     if(err)
	      res.send(err);
	     console.log('Data saved from ' + csv_file);

	    });
	    
	    });
	    stream.pipe(parser);

	    res.redirect(req.session.lastPage);

	});
	

	app.get('/upload_form', isLoggedIn, function(req, res) {

		res.render('pages/upload_form.ejs');

	});

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
function getMovies(arg, callback){
	console.log('Getting movie for searchterm '+arg);

		omdb.search(arg, function(err, movies) {
		    if(err) {
		        return console.error(err);
		    }
		    if(movies.length < 1) {
		        return console.log('No movies were found!');
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
	
	console.log('Getting Uploaded movies for user');
	// "117455612749622948262"
	Upload.find({user_id : user}, function(err, info){
		var allmovies = [];
		info.forEach(function(object) {
			allmovies.push(object);
			
		})
	
	callback(allmovies);
	return;
	
	})

}
//getMovieInfo(imdb, object.imdb_id, function(data){
function getMovieInfo(imdb_id, callback) {
	console.log('Getting movieInfo for '+imdb_id);
	omdb.get( imdb_id, true, function(err, movie){
		
		console.log('getting info for '+movie.title);

		if(err) {
			return console.log(err);
		}

		if(!movie) {
			return console.log('No movie found');
		}

		var moviedata = [];
	    //globalshit = movie.imdb.id;
	    moviedata.push({
	        	"title" : movie.title,
	     		"year" : movie.year,
	     		"plot" : movie.plot,
	     		"rating" : movie.imdb.rating,
	     		"votes" : movie.imdb.votes,
	     		"runtime" : movie.runtime,
	     		"actors" : movie.actors,
	     		"director" : movie.director,
	     		"writers" : movie.writers,
	     		"imdb_id" : movie.imdb.id
			     		
	    });
	  	//console.log(moviedata);
	  	getPoster(imdb_id, function(poster){
	  		callback(moviedata, poster);
			return;	
	  	})	
		
	});
}

function getPoster(value, callback){

		// FROM getMovieInfo
		//imdb_id = value[0].imdb_id;
		
		mdb.movieInfo({id: value}, function(err, movie){
  		
		if(err) {
			console.log('Found no poster for movie');
			var poster = "img/missingposter.jpg"
			callback(poster);
			return;
			
		}

		if(!movie) {
			console.log('No movie found for POSTERS');
			var poster = "img/missingposter.jpg"
			callback(poster);
			return;
		}
		//console.log(movie);
  		//console.log('getting poster for '+movie.title);
  		poster = "http://image.tmdb.org/t/p/w500"+movie.poster_path;
		callback(poster);
		return;
	});
}

function ModusCollect(arg, callback){
	console.log('in moduscollect');

	Upload.find({imdb_id : arg}, function(err, info){
		
		//console.log('info comes here '+info);
		//console.log(typeof(info));

		if(err){
			console.log(err);
		}
		
		else{
			
			var values = ['Results']
			
			info.forEach(function(object){
				bpmvalue = parseFloat(object.bpmvalue);
				values.push(bpmvalue);
				})
				var count = values.length-1;
				var result = findAverage(values);

			console.log(values);
			totalmodusvalue = result;


			var callbackString = {};
			callbackString.modusdata = totalmodusvalue;
			callbackString.counter = count;
			//console.log(modusdata.length);
			callback(callbackString);
			return;
		}

		
	})
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

