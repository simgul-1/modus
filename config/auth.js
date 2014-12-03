// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '755027641218361', // your App ID
		'clientSecret' 	: '1efc2e1c22ca3198be3d32b04db2aa00', // your App Secret
		'callbackURL' 	: 'http://wayland.campus.ltu.se:3003/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'zmMnO2zeOFiphz3V4Dwrmcmda',
		'consumerSecret' 	: 'jilLB44jaCeLTonfUR1dwxW29XPVEB2v7HQbQT66dIQqGllk6m',
		'callbackURL' 		: 'http://wayland.campus.ltu.se:3003/auth/twitter/callback'
	},

    'googleAuth' : {
        'clientID'      : '387127984694-bhb4maaj9di77f48qhbohmi1lljgunqv.apps.googleusercontent.com',
        'clientSecret'  : 'KDmuaqNAhqk69ZgXD7TEGS7d',
        'callbackURL'   : 'http://wayland.campus.ltu.se:3000/auth/google/callback'
    }

};
