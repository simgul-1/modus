// config/auth.js
// TEST MESSAGE
// expose our config directly to our application using module.exports
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
/*
VICTOR 

	'facebookAuth' : {
		'clientID' 		: '747475465332188', // your App ID
		'clientSecret' 	: 'bc95afdb4fb1705cb77ca6a389f3d6d0', // your App Secret
		'callbackURL' 	: 'localhost:3000/auth/facebook/callback'
	},

	'googleAuth' : {
        'clientID'      : '989951666354-cc28vjs8sp6ls5jo6pns7jf55a6e4jh6.apps.googleusercontent.com',
        'clientSecret'  : 'uNNAMhPAck4hzHOCduvTsY0L',
        'callbackURL'   : 'localhost:3000/auth/google/callback'
    }

};

*/

/*
SIMON
*/


