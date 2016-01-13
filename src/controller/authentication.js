// example: https://github.com/GoogleCloudPlatform/nodejs-getting-started/blob/master/4-auth/lib/oauth2.js

var googleapis = require('googleapis');
var crypto = require('crypto');

var clientId;
var clientSecret;
var redirectUrl;

function Authentication(secretsJson, url) {
	clientId = secretsJson['web']['client_id'];
	clientSecret = secretsJson['web']['client_secret'];
	redirectUrl = url;
}

Authentication.prototype.generateStateToken = function() {
	return crypto.randomBytes(16).toString('hex');
};

Authentication.prototype.getClient = function() {
	return new googleapis.auth.OAuth2(
		clientId,
		clientSecret,
		redirectUrl
	);
};

Authentication.prototype.getUserInfo = function(client) {
	var plus = googleapis.plus('v1');
	return plus.people.get({
		userId: 'me',
		auth: client
	});
};

module.exports = Authentication;