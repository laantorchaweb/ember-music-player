import Ember from 'ember';
import layout from '../templates/components/music-player';

export default Ember.Component.extend({
  layout: layout,
  isPlaying: false,
  defaultVolume: 15,
  volume: Ember.computed('defaultVolume', function() {
    return this.get('defaultVolume') / 100;
  }),

  playing: {
    title: '',
    artist: '',
    cover: ''
  },

  song: null,

  initialize: Ember.on('didInsertElement', function() {
    let _this = this;
    let $this = this.$();

    initAudio($this.find('.playlist li:first-child'));

    $this.find('input[type="range"]').on('change', () => {
      this.get('song').volume = this.get('volume');
    });

    this.get('song').volume = this.get('volume');

    function initAudio(elem) {
      var url = elem.attr('audiourl');

      _this.set('song', new Audio('data/' + url));

      _this.get('song').addEventListener('timeupdate',function (){
        var curtime = parseInt(_this.get('song').currentTime, 10);
      });

      $this.find('.playlist li').removeClass('active');
      elem.addClass('active');
    }
  }),

  actions: {
    playAudio() {
      this.get('song').play();

      this.set('status', 'playing');
      this.set('playing.title', 'titulo');
      this.set('isPlaying', true);

    },
    stopAudio() {
      this.get('song').pause();

      this.set('isPlaying', false);
    },
    setVolume() {
      this.get('song').volume = this.$().find('input[type="range"]').val() / 100;
    }
  }
});
