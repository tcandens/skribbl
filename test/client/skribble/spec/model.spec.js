'use strict';

var expect = chai.expect;

describe('Skribble Backbone Model', function() {

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

    this.mockCollection = new SkribbleCollection( mockModels );

    // Setup Sinon Fake Server
    this.server = sinon.fakeServer.create();
  });

  afterEach(function(done) {
    this.server.restore();
    done();
  });

  it('should find itself among parent collection', function( done ) {

  });

});
