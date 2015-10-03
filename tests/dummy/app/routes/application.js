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
        },
        {
          title: 'Song Title 2',
          artist: 'Artist Name 2',
          cover: 'cover.jpg',
          file: {
            mp3: '01.mp3'
          }
        },
        {
          title: 'Song Title 3',
          artist: 'Artist Name 3',
          cover: 'cover.jpg',
          file: {
            mp3: '01.mp3'
          }
        }
      ]
    };
  }
});
