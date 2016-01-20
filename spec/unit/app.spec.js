var path = require('path');
var express = require('express');
var expect = require('chai').expect;
var request = require('supertest');
var api = request('http://character-manager.i.argeiphontes.com:3000');

var app = require('../../src/test.js');
var dbJs = require('../../src/db.js');
var db;

describe('app', function() {

	describe('oauth routes', function() {
		it('oauth2/authorize', function(done) {
			api
				.get('/oauth2/authorize')
				.expect(302)
				.end(function(err, res) {
					if(err) { throw err; }
					expect(res.header.location).contain('accounts.google.com');
					done();
				});
		});

		it('oauth2callback', function(done) {
			api
				.get('/oauth2/authorize')
				.get('/oauth2callback')
				.end(function(err, res) {
					if(err) { throw err; }
					console.log(res);
					done();
				})
		}); 
	});

	describe('top level routes', function() {
		it('/', function(done) {
			api
				.get('/')
				.expect(200, done);
		});
	});

	describe('pathfinder routes', function() {

		it('respond with json', function(done) {
			api
				.get('/pathfinder.json')
				.set('Content-Type', 'application/json')
				.expect(200, done);
		});
		
		it('responds with pf characters', function(done) {
			api
				.get('/pathfinder/characters/1')
				.expect(200, done);
		});
	});
});