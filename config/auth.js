// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '755027641218361', // your App ID
		'clientSecret' 	: '1efc2e1c22ca3198be3d32b04db2aa00', // your App Secret
		'callbackURL' 	: 'http://wayland.campus.ltu.se:3000/auth/facebook/callback'
	},

	'googleAuth' : {
        'clientID'      : '306233627276-39g2sp77ef5cnr91s4f9jrmrql6vqj29.apps.googleusercontent.com',
        'clientSecret'  : 'y3pt0MK11DBpD-sALETkwhky',
        'callbackURL'   : 'http://wayland.campus.ltu.se:3000/auth/google/callback'
    }

};
