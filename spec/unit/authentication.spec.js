var path = require('path');
var expect = require('chai').expect;

var Authentication = require('../../src/controllers/authentication.js');
var oAuthSecrets = require('../../.secrets/client_secret.json');

describe('authentication', function() {

	var auth;
	var clientId;
  var clientSecret;
	var redirectUrl;
	var scope;

	describe('google oauth', function(){ 
		
		beforeEach(function() {
			clientId = oAuthSecrets['web']['client_id'];
			clientSecret = oAuthSecrets['web']['client_secret'];
			redirectUrl = oAuthSecrets['web']['redirect_uris'];
			scope = oAuthSecrets['web']['scope'];
		});

		it('logs in', function() {
			auth = new Authentication(oAuthSecrets);
			var client = auth.getClient();
			var authorizeUrl = client.generateAuthUrl({
      	access_type: 'offline',
      	scope: scope,
      	state: auth.generateStateToken()
   		});
			expect(authorizeUrl).to.contain('http');
		});

		/*it('destroy session', function() {
			expect(true).to.be.false;
		});

		it('Set user login', function() {
			expect(true).to.be.false;
		});*/
	});
});