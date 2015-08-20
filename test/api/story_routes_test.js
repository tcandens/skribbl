'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var mongoose = require('mongoose');
var Skribbl = require('../../lib/models/skribbl.js');
var populateDB = require('../../lib/bin/pop_db.js').loremStorys;
var _ = require('lodash');
chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start api server for testing
require('../../server.js');


describe('Story routes', function() {

  var validid = null;
  var lowerSkribbl;
  before(function(done) {
    populateDB(5, function(){
      Skribbl.find({}, function(err, skribbl){
        if (err) throw err;
        validid = skribbl[0]._id;
        lowerSkribbl  = skribbl[10];
        done();
      });
    });
  });

  describe('GET /api/storys', function (){
    describe('with valid inputs', function(){
      it.skip('should return aray length > 0',function(done){
        chai.request('localhost:3000')
          .get('/api/storys')
          .end(function(err, res){
            expect(err).to.eql(null);
            expect(res.body.length).to.be.above(0);
            done();
          });
      });
    });
  });

  describe('GET /api/storys/:id', function (){
    describe('with valid id', function(){
      it.skip('should return aray length > 0',function(done){
        var route = "/api/storys/" + validid;
        chai.request('localhost:3000')
          .get(route)
          .end(function(err, res){
            expect(err).to.eql(null);
            expect(res.body.length).to.be.above(0);
            done();
          });
      });
    });
  });

  describe('GET /api/storys/:id', function (){
    describe('with invalid id', function(){
      it.skip('req.body should be empty',function(done){
        var route = "/api/storys/" + '555555555555555555555555' ;
        chai.request('localhost:3000')
          .get(route)
          .end(function(err, res){
            expect(err).to.eql(null);
            expect(_.isEmpty( res.body)).to.eq(true);
            done();
          });
      });
    });
  });

  describe('THE DATABASE', function() {
    it.skip('is filled with', function(done) {
      Skribbl.find({parent_skribbl: null}, function(err, skribs) {
        console.log('DATABASE IS: ', skribs);
        done();
      });
    });
  });

  describe('GET /api/storys/randoms/:num?', function() {
    describe('when 1 is passed for :num', function() {
      it.skip('returns 1 random story skribbl', function(done) {
        chai.request('localhost:3000')
          .get('/api/storys/randoms/1')
          .end(function(err, res) {
            expect(err).to.eq(null);
            expect(res.body instanceof Array).to.eq(true);
            expect(res.body.length).to.eq(1);
            done();
          });
      });
    });
    describe('when no value is passed for num', function() {
      it.skip('returns default up to 20 random story skribbls', function(done) {
        chai.request('localhost:3000')
          .get('/api/storys/randoms/')
          .end(function(err, res) {
            expect(err).to.eq(null);
            expect(res.body instanceof Array).to.eq(true);
            expect(res.body.length).to.eq(2); // 2 is all there are in the db
            done();
          });
      });
    });
  });

  describe('GET /api/storys/random/', function() {
    it('should return an array of skribble tree nodes', function( done ) {
      chai.request('localhost:3000')
        .get('/api/storys/random')
        .end(function( err, res ) {
          expect(err).to.eq( null );
          expect(_.isArray( res.body )).to.eq(true);
          expect(res.body[0]).to.have.property('children');
          done();
        });
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
});
