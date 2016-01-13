var path = require('path');
var express = require('express');
var expect = require('chai').expect;
var request = require('supertest');
var api = request('http://localhost:3000');

var app = require('../../src/test.js');
var dbJs = require('../../src/db.js');
var db;

describe('app', function() {

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
	});
});