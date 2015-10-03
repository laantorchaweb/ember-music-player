import Ember from 'ember';
import layout from '../templates/components/music-player';

export default Ember.Component.extend({
  layout: layout,
  isPlaying: false,
  volume: 15,

  playing: {
    title: '',
    artist: '',
    cover: ''
  },

  current_song: null,

  handleMeta( song ) {
    this.set('playing.title', song.title);
    this.set('playing.artist', song.artist);
    this.set('playing.cover', song.cover);
  },

  stopCurrentSong() {
    if ( this.get('isPlaying') ) {
      this.get('current_song').pause();
      this.get('current_song').currentTime = 0;
    }
  },

  handleVolume: Ember.observer('volume', function() {
    let volume = this.get('volume') / 100;

    this.get('current_song').volume = volume;
  }),

  actions: {
    playAudio( audio ) {
      let song = audio;

      this.stopCurrentSong();

      if ( !audio ) {
        song = this.get('playlist')[0];
      }

      this.set('current_song', new Audio('data/' + song.file.mp3));

      const current_song = this.get('current_song');

      this.handleVolume();
      current_song.play();

      this.handleMeta( song );

      this.set('isPlaying', true);
      this.set('status', 'playing');

      current_song.addEventListener('timeupdate', () => {
        let time = parseInt(current_song.currentTime, 10);
        this.set('current_time', time);
      });
    },

    pauseAudio() {
      let current_song = this.get('current_song');

      if ( !current_song.paused ) {
        current_song.pause();
      } else {
        current_song.play();
      }
    },

    stopAudio() {
      this.stopCurrentSong();

      this.set('isPlaying', false);
    },

    setVolume() {
      this.handleVolume();
    }
  }
});
