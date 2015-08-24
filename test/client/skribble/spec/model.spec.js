'use strict';

var expect = chai.expect;

describe('Skribble Backbone Collection', function() {

  var Backbone, SkribbleCollection, SkribbleModel;

  beforeEach(function(done) {
    require([
      'backbone',
      'skribble/skribble_collection',
      'skribble/skribble_model'
    ], function( backbone, skribbleCollection, skribbleModel ) {
      Backbone = backbone;
      SkribbleCollection = skribbleCollection;
      SkribbleModel = skribbleModel;
      done();
    });

    this.collectionFetchResponse = [
      {
        _id: 42,
        children: [
          {
            _id: 24,
            children: [
              {
                _id: 1337,
                children: null
              }
            ]
          }
        ]
      }
    ];

    // Setup Sinon Fake Server
    this.server = sinon.fakeServer.create();
  });

  afterEach(function(done) {
    this.server.restore();
    done();
  });

  it('should fetch and parse into nested models and collections', function(done) {
    var testCollection = new SkribbleCollection();
    this.server.respondWith( JSON.stringify( this.collectionFetchResponse ) )
    testCollection.url = 'http://localhost:8000/api/storys/random';
    testCollection.fetch();
    this.server.respond();
    console.log( testCollection )
    expect( testCollection.at(0) ).to.be.instanceof( Backbone.Model );
    expect( testCollection.at(0).get('children') ).to.be.instanceof( Backbone.Collection );
    expect( testCollection.at(0).get('children').at(0).get('children') ).to.be.instanceof( Backbone.Collection );
    done();
  });

});
