// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1514454032174240', // your App ID
		'clientSecret' 	: '8bdd81b1950ac1f8b01771bc58070db7', // your App Secret
		'callbackURL' 	: 'http://wayland.campus.ltu.se:3003/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'zmMnO2zeOFiphz3V4Dwrmcmda',
		'consumerSecret' 	: 'jilLB44jaCeLTonfUR1dwxW29XPVEB2v7HQbQT66dIQqGllk6m',
		'callbackURL' 		: 'http://wayland.campus.ltu.se:3003/auth/twitter/callback'
	},

    'googleAuth' : {
        'clientID'      : '306233627276-gcvp2t22c3f6a3rvdi2pn3m6gq77c8ee.apps.googleusercontent.com',
        'clientSecret'  : 'H6Xf-tQKrVeduBi7R_KdVyOp',
        'callbackURL'   : 'http://wayland.campus.ltu.se:3003/auth/google/callback'
    }

};