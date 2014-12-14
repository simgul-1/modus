// config/auth.js
// TEST MESSAGE
// expose our config directly to our application using module.exports

// ---------------------- THE REAL DEAL ---------------------------
// ---------- kommentera ut erat innan ni commitar och pushar!!! ---------------------

//Live Mode

module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1514454032174240',
		'clientSecret' 	: '8bdd81b1950ac1f8b01771bc58070db7',
		'callbackURL' 	: 'http://wayland.campus.ltu.se:3000/auth/facebook/callback'
	},

	'googleAuth' : {
        'clientID'      : '387127984694-bhb4maaj9di77f48qhbohmi1lljgunqv.apps.googleusercontent.com',
        'clientSecret'  : 'KDmuaqNAhqk69ZgXD7TEGS7d',
        'callbackURL'   : 'http://wayland.campus.ltu.se:3000/auth/google/callback'
    }

};

/*
//Developer mode
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1519354678350842',
		'clientSecret' 	: 'ac5c66ec2fdfb9fa5dd43ad40dd5668f',
		'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	},

	'googleAuth' : {
        'clientID'      : '351216799888-iu82s6pj86mjpetrhh06ta4sk80uslql.apps.googleusercontent.com',
        'clientSecret'  : 'L5K8j_lBkvJaH00RY6a3XREK',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }


};
*/