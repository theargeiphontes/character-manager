// example: https://github.com/GoogleCloudPlatform/nodejs-getting-started/blob/master/4-auth/lib/oauth2.js

var googleapis = require('googleapis');
var crypto = require('crypto');

var clientId;
var clientSecret;
var redirectUrl;
var scope;

function Authentication(secretsJson) {
	clientId = secretsJson['web']['client_id'];
	clientSecret = secretsJson['web']['client_secret'];
	redirectUrl = secretsJson['web']['redirect_uris'];
	scope = secretsJson['web']['scope'];
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

Authentication.prototype.getUserInfo = function(client, next) {
	var plus = googleapis.plus('v1');
	return plus.people.get({
		userId: 'me',
		auth: client
	}, next);
};


Authentication.prototype.authAware = function(req, res) {
	/* jshint unused:false */
	if(req.session.oauth2tokens) {
    req.oauth2client = Authentication.prototype.getClient();
    req.oauth2client.setCredentials(req.session.oauth2tokens);
  }

	if(req.oauth2client) {
    req.session.oauth2tokens = req.oauth2client.credentials;
  }
};

Authentication.prototype.authRequired = function(req, res) {
  Authentication.prototype.authAware(req, res, function() {
    if(!req.oauth2client) {
      req.session.oauth2return = req.originalUrl;
      return res.redirect('/oauth2/authorize');
    }
  });
};

Authentication.prototype.addTemplateVariables = function(req, res) {
  res.locals.profile = req.session.profile;
  res.locals.login = '/oauth2/authorize?return=' + encodeURIComponent(req.originalUrl);
  res.locals.logout = '/oauth2/logout?return=' + encodeURIComponent(req.originalUrl);
};

module.exports = Authentication;