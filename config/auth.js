// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '1514454032174240', // your App ID
		'clientSecret' 	: '8bdd81b1950ac1f8b01771bc58070db7', // your App Secret
		'callbackURL' 	: 'http://wayland.campus.ltu.se:3000/auth/facebook/callback'
	},

	'googleAuth' : {
        'clientID'      : '306233627276-39g2sp77ef5cnr91s4f9jrmrql6vqj29.apps.googleusercontent.com',
        'clientSecret'  : 'y3pt0MK11DBpD-sALETkwhky',
        'callbackURL'   : 'http://wayland.campus.ltu.se:3000/auth/google/callback'
    }

};
