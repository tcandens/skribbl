'use strict';

var expect = chai.expect;

describe('Skribble Service', function () {

  var Service, SkribbleModel, SkribbleCollection;

  beforeEach(function (done) {
    require([
      'skribble/model',
      'skribble/collection',
      'skribble/service'
    ], function( model, collection, service ) {
      Service = service;
      SkribbleModel = model;
      SkribbleCollection = collection;
      done();
    });

    this.server = sinon.fakeServer.create();
    this.turds = 'turds';
  });

  afterEach(function (done) {
    Service._clear();
    this.server.restore();
    done();
  });

  // Test singleton stuff
  it('.getInstance() should return a singleton', function () {
    var singleton_one = Service.getInstance();
    singleton_one._current = 'Test';
    var singleton_two = Service.getInstance();
    // Make sure both instances are the in fact the same instance
    expect( singleton_two._current ).to.eql( singleton_one._current );
  });

  // Test seeding abilities
  it('seeding service with SkribbleModel should return object with current & parent content', function( done ) {
    // Setup
    var service = Service.getInstance();
    var model = new SkribbleModel({_id:1,parent_skribbl:2,content:'seed'});
    this.server.respondWith(JSON.stringify({
      id: 1,
      parent_skribbl: null,
      content: 'parent',
      children: [
        {id: 3, parent_skribbl: 1, content: 'sibling'}
      ]
    }));
    var callback = sinon.spy();
    this.server.autoRespond = true;

    // Seed
    service.seedWith( model, function( _package ) {
      var state = service._state();
      expect( state.current.attributes.content ).to.eql('seed');
      expect( state.parent.attributes.content ).to.eql('parent');
      expect( state.siblings.at(0).attributes.content ).to.eql('sibling');
      done();
    });
  });


  describe('Skribble Service tree crawling functions', function() {

    beforeEach(function() {
      this.service = Service.getInstance();
    });

    afterEach(function() {
      Service._clear();
    })
  });
});

