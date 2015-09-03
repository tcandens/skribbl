'use strict';

var expect = chai.expect;

describe('Skribble Backbone Model', function() {

  var Backbone, SkribbleModel;

  beforeEach(function(done) {
    require([
      'backbone',
      'skribble/model'
    ], function( backbone, skribbleModel ) {
      Backbone = backbone;
      SkribbleModel = skribbleModel;
      done();
    });

    // Mock server response for model fetch
    this.mockFetch = JSON.stringify({
      testAttr: 'test'
    });
    // Setup Sinon Fake Server
    this.server = sinon.fakeServer.create();
  });

  afterEach(function(done) {
    this.server.restore();
    done();
  });

  it('should fetch model and the execute callback with updated model passed through', function( done ) {
    this.server.respondWith( this.mockFetch );
    var testModel = new SkribbleModel({ id: 1 });
    var callback = sinon.spy();
    testModel.asyncFetch( callback );
    this.server.respond();
    sinon.assert.calledWith( callback, sinon.match({ attributes: {testAttr: 'test'} }) );
    done();
  });

});
