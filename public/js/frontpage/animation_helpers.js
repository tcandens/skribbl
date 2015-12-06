define([
  'underscore',
  'tweenLite',
], function(_, TweenLite) {
  return {
    drawPath: function(timeline, element, options) {
      var options = _.defaults(options || {}, {
        duration: 1,
        position: '=0',
        ease: Quad.easeInOut
      })
      var $el = document.querySelector(element);
      var length = $el.getTotalLength();
      timeline.fromTo($el, options.duration, {
        strokeDasharray: length,
        strokeDashoffset: length
      }, {
        strokeDashoffset: 0,
        ease: options.ease
      }, options.position)
    }
  }
});
