module.exports = function(app, passport) {

// normal routes ===============================================================
	var multipart = require('connect-multiparty');
	var multipartMiddleware = multipart();
	var fs = require('fs');
	var Parse = require('../app/models/parse');
	var flash = require('connect-flash');
	var omdb = require('omdb');
	var session = require('express-session');

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('pages/index.ejs', {
			user : req.user
		}); 
	});
	
	// show the home page (will also have our login links)
	app.get('/about', function(req, res) {
		res.render('pages/about.ejs', {
			user : req.user
		});
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('pages/profile.ejs', {
			user : req.user
		});
	});
	
	// PROFILE SECTION =========================
	app.get('/uploads', isLoggedIn, function(req, res) {
		res.render('pages/uploads.ejs', {
			user : req.user
		});
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// POST REQUEST TO SEARCH
	app.post('/search', isLoggedIn, function(req, res) {

		function getMovies(arg, callback){
			console.log('In search post');

			console.log('searching for '+arg);
			
			omdb.search(arg, function(err, movies) {
			    if(err) {
			        return console.error(err);
			    }

			    if(movies.length < 1) {
			        return console.log('No movies were found!');
			    }	

			    
			    // Array containing all results
			    var results = [];
			   	// Array containing titles
			    var moviedata = [];

			   	movies.forEach(function(movie) {
			        
			        // If title exists in array, dont push.
			       	// if(titles.indexOf(movie.title) > -1){
			        // 	console.log('skipped duplicate title of '+movie.title);
			        	
			        // }
			        //else{
			        	
			        	moviedata = [
			        		movie.title, 
			        		movie.year,
			        		movie.poster
			        	];

			        	results.push(moviedata);
			        	//titles.push(movie.title);
			        	//console.log('pushed '+movie.title);
			        //}
			    });

			   	var json_results = JSON.parse(JSON.stringify(results))
			    // Saves the titles in a session
			    req.session.results = json_results;
			    
			    console.log('HEre comes results:');
			    console.log(req.session.results);
			    
			    // Done with the API request
				callback();
					
		    });

			
		}

		var title = req.body.title;

		getMovies(title, function() {
			
			console.log('Done with API request, redirecting to GET SEARCH');
			res.redirect('/search');

		});

	});

	// GET REQUEST TO SEARCH
	app.get('/search', isLoggedIn, function(req, res) {
		
		//console.log(req.session);
		console.log('Here comes session \n'+req.session.titles + '\n');
		
		if(req.session.titles.length > 0) {
		
		console.log('Got general results from movies');
		res.render('pages/search.ejs', { title: 'Search', titles: req.session.titles, user: req.user });
		req.session.titles = null;
	
		}
		else{
			console.log('error in get search');
			
		}

	});

	app.post('/search_specific', isLoggedIn, function(req, res) {

		var title = req.body.title;
	
		omdb.get( {title: title}, true, function(err, movie){
		console.log('getting movie info');

		if(err) {
			return console.log(err);
		}

		if(!movie) {
			return console.log('No movie found');
		}

		console.log('Movie title searched for is: '+movie.title+' and the year is '+movie.year);
		
		console.log('movie.title is '+movie.title);
		console.log('movie.year is '+movie.year);
		console.log('movie.plot is '+movie.plot);
		//console.log('movie.poster is '+movie.poster);
		console.log('movie.imdb.rating is '+movie.imdb.rating);
		req.session.result = {
			
			title: movie.title,
			year: movie.year,
			plot: movie.plot,
			poster: movie.poster,
			rating: movie.imdb.rating
		};

		

		res.redirect('/search_specific');

		});
		
	});

	app.get('/search_specific', isLoggedIn, function(req, res) {
		if(req.session.result) {
		
		console.log('Got result from movie in RESULT page');
		
		res.render('pages/search_specific.ejs', { title: 'Search', movie: req.session.result, user: req.user });
		req.session.result = null;
	
		}
		else{
			console.log('error');
			//res.render('error');
		}

	});

	
	// Upload route
	app.post('/upload', multipartMiddleware, function(req, res) {
		
		console.log('uploading');

		require('should');

	    //Parsing function
	    var parse = require('csv-parse');
	    var csv_file = req.files.movie_csv.path;
	    console.log(csv_file);
	    console.log('CSV uploaded, moving on to parse...');

	    //PARSAR IGENOM FILEN
	    stream = fs.createReadStream(csv_file);

	    var parser = parse({delimiter: ','}, function(err, data){

	    console.log('Parse done, moving on to save..');

	    //STOPPA IN SKITEN I DATABASEN
	    var parse = new Parse({
	      data : data,
	      creation_time : Date.now(),
	      path  : csv_file,
	      movie_title: req.body.movie_title
	     });
	    console.log("data comes here:  ");
	    console.log("---------------------");
	    console.log(data);
	    console.log("---------------------");
	    parse.save(function(err){
	     if(err)
	      res.send(err);
	     console.log('Data saved from ' + csv_file)
	    });
	    
	    });
	    stream.pipe(parser);

	    // Message popup when done (not working yet)
	    console.log(req.flash('info'));

	    res.redirect('/');
	    

	});
	
	app.get('flash', function(req, res) {

		req.flash('upload_complete', 'The upload and parse is complete');

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
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

	// google ---------------------------------

		// send to google to do the authentication
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		app.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : '/profile',
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

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
