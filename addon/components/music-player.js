import Ember from 'ember';
import layout from '../templates/components/music-player';

export default Ember.Component.extend({
  layout: layout,
  isPlaying: false,
  defaultVolume: 15,
  volume: 0,

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

  actions: {
    playAudio( audio ) {
      let song = audio;

      this.stopCurrentSong();

      if ( !audio ) {
        song = this.get('playlist')[0];
      }

      this.set('current_song', new Audio('data/' + song.file.mp3));
      this.get('current_song').play();

      this.handleMeta( song );

      this.set('isPlaying', true);
      this.set('status', 'playing');

      this.get('current_song').addEventListener('timeupdate', () => {
        let time = parseInt(this.get('current_song').currentTime, 10);
        this.set('current_time', time);
      });
    },

    pauseAudio() {
      if ( this.get('isPlaying') ) {
        this.get('current_song').pause();
      }
    },

    stopAudio() {
      this.stopCurrentSong();

      this.set('isPlaying', false);
    },

    setVolume() {
      this.set('volume', this.$().find('input[type="range"]').val() / 100)
      this.get('current_song').volume = this.get('volume');
    }
  }
});
