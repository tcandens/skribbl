define([
  'tweenLite',
  'timelineLite',
  'easingPack',
  'cssPlugin',
  'frontpage/animation_helpers'
], function(TweenLite, TimelineLite, Ease, cssPlugin, Helpers) {

  return {
    start: function() {
      var step = 1;
      var stepPush = '+=' + step;
      var stepPull = '-=' + step;

      var tl = new TimelineLite();

      // Bubble fades in staggered
      tl.staggerFromTo([
        '#bubble__one',
        '#bubble__two',
        '#bubble__main',
        '#bubble__main--text'
      ], step, {
        y: 10
      }, {
        opacity: 1,
        y: 0,
        ease: Power2.easeInOut
      }, 0.2);

      // Switch seed for bubble text
      tl.to('#bubble__main--text', step, {
        opacity: 0,
        y: 10,
        ease: Power2.easeInOut
      }, stepPush);
      tl.fromTo('#seed', step, {
        y: -10
      }, {
        y: 0,
        opacity: 1,
        ease: Power2.easeInOut
      }, stepPull);

      // Seed drops into ground aperture
      tl.fromTo('#seed', step*2, {
        y: 0,
        transformOrigin: '50% 50%',
        rotation: 0
      }, {
        y: 340,
        rotation: -80,
        ease: Expo.easeIn
      })
      tl.to('#seed', 1, {
        y: '+=20',
        ease: Power2.easeInOut
      });

      tl.to([
        '#bubble__main',
        '#bubble__one',
        '#bubble__two'
      ], step, {
        opacity: 0
      }, '-=2');

      // Sprout begins growing
      tl.set('#sprout__stem--main', {opacity: 1});
      Helpers.drawPath(tl, '#sprout__stem--main', {duration: 0.8, ease: Quad.easeInOut});
      tl.addLabel('sproutStem');

      tl.set('#sprout__stem--left', {opacity: 1}, 'sproutStem');
      Helpers.drawPath(tl, '#sprout__stem--left', {duration: 0.4, position: 'sproutStem'});
      tl.addLabel('sproutStemLeft');

      tl.set('#sprout__stem--right', {opacity: 1}, 'sproutStem');
      Helpers.drawPath(tl, '#sprout__stem--right', {duration: 0.4, position: 'sproutStem'});
      tl.addLabel('sproutStemRight');

      tl.set('#sprout__leaf--left', {opacity: 1}, 'sproutStemLeft');
      tl.fromTo('#sprout__leaf--left', 0.4, {
        scale: 0,
        transformOrigin: '100% 50%'
      }, {
        scale: 1,
        ease: Quad.easeInOut
      }, 'sproutStemLeft');

      tl.set('#sprout__leaf--right', {opacity: 1}, 'sproutStemRight');
      tl.fromTo('#sprout__leaf--right', 0.4, {
        scale: 0,
        transformOrigin: '0% 50%'
      }, {
        scale: 1,
        ease: Quad.easeInOut
      }, 'sproutStemRight');

      tl.set('#sprout__bud', {opacity: 1}, 'sproutStem');
      tl.fromTo('#sprout__bud', step*2, {
        opacity: 0,
        scale: 0,
        transformOrigin: '50% 100%'
      }, {
        opacity: 1,
        scale: 1,
        ease: Quad.easeInOut
      }, 'sproutStem')
        .addLabel('sproutBud');

      tl.to('#sprout__bud', step, {
        scale: 7,
        opacity: 0,
        transformOrigin: '50% 50%',
        ease: Expo.easeOut
      });

      tl.fromTo(['#story__prime--field', '#story__prime--text'], step, {
        opacity: 0,
        scale: 0.8,
        transformOrigin: '50% 50%'
      }, {
        opacity: 1,
        scale: 1,
        ease: Quad.easeIn
      }, stepPull);

      tl.to('#ground-group', 1, {
        y: 100,
        opacity: 0,
        ease: Sine.easeIn
      }, 'sproutBud')
        .add('noGround');

      tl.to([
        '#connector__base--center',
        '#connector__base--left',
        '#connector__base--right',
      ], 0.8, {
        opacity: 1
      });

      tl.fromTo([
        '#story__primary--left__field',
        '#story__primary--center__field',
        '#story__primary--right__field',
        '#story__primary--left__text',
        '#story__primary--center__text',
        '#story__primary--right__text'
      ], step, {
        scale: 0.8,
        transformOrigin: '50% 100%',
        opacity: 0
      }, {
        scale: 1,
        opacity: 1
      });

      tl.to([
        '#connector__secondaryroot--left',
        '#connector__secondaryroot--center',
        '#connector__secondaryroot--right',
      ], 0.5, {
        opacity: 1
      });
      tl.to([
        '#connector__secondarybranch--left',
        '#connector__secondarybranch--center',
        '#connector__secondarybranch--right',
      ], 0.5, {
        opacity: 1
      });

      tl.fromTo([
        '#story__secondary--ll__field',
        '#story__secondary--ll__text',
        '#story__secondary--lr__field',
        '#story__secondary--lr__text',
        '#story__secondary--rl__field',
        '#story__secondary--rl__text',
        '#story__secondary--rr__field',
        '#story__secondary--rr__text',
        '#story__secondary--cl__field',
        '#story__secondary--cl__text',
        '#story__secondary--cr__field',
        '#story__secondary--cr__text'
      ], step, {
        scale: 0.8,
        transformOrigin: '50% 100%',
        opacity: 0
      }, {
        scale: 1,
        opacity: 1
      });

      tl.to([
        '#connector__tertiaryout--left',
        '#connector__tertiaryout--right',
        '#connector__tertiaryup--left',
        '#connector__tertiaryup--right'
      ], 0.5, {
        opacity: 1
      });

      tl.fromTo([
        '#story__tertiary--ll__field',
        '#story__tertiary--ll__text',
        '#story__tertiary--lr__field',
        '#story__tertiary--lr__text',
        '#story__tertiary--rl__field',
        '#story__tertiary--rl__text',
        '#story__tertiary--rr__field',
        '#story__tertiary--rr__text'
      ], step, {
        scale: 0.8,
        transformOrigin: '50% 100%',
        opacity: 0
      }, {
        scale: 1,
        opacity: 1
      });
    }
  }

});
