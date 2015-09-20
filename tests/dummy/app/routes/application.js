import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      playlist: [
        {
          title: 'Song Title',
          artist: 'Artist Name',
          cover: 'cover.jpg',
          file: {
            mp3: '01.mp3'
          }
        }
      ]
    };
  }
});
