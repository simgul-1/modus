// config/auth.js
// TEST MESSAGE
// expose our config directly to our application using module.exports

// ---------------------- THE REAL DEAL ---------------------------
// ---------- kommentera ut erat innan ni commitar och pushar!!! ---------------------

//Live Mode

module.exports = {

	'facebookAuth' : {
		'clientID' 		: '755027641218361', // your App ID
		'clientSecret' 	: '1efc2e1c22ca3198be3d32b04db2aa00', // your App Secret
		'callbackURL' 	: 'http://wayland.campus.ltu.se:3000/auth/facebook/callback'
	},

	'googleAuth' : {
        'clientID'      : '387127984694-bhb4maaj9di77f48qhbohmi1lljgunqv.apps.googleusercontent.com',
        'clientSecret'  : 'KDmuaqNAhqk69ZgXD7TEGS7d',
        'callbackURL'   : 'http://wayland.campus.ltu.se:3000/auth/google/callback'
    }

};
<<<<<<< HEAD

=======
>>>>>>> 3531fd257392a37eacac52267010be4c3a800a23

/*
//Developer mode
module.exports = {

	'facebookAuth' : {
	'clientID' 	: '1519354678350842', // your App ID
	'clientSecret' 	: 'ac5c66ec2fdfb9fa5dd43ad40dd5668f', // your App Secret
	'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	},

	'googleAuth' : {
        'clientID'      : '351216799888-iu82s6pj86mjpetrhh06ta4sk80uslql.apps.googleusercontent.com',
        'clientSecret'  : 'L5K8j_lBkvJaH00RY6a3XREK',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }
<<<<<<< HEAD

};
*/
=======
    
};
*/
>>>>>>> 3531fd257392a37eacac52267010be4c3a800a23
