/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-music-player',
  included: function(app) {
    this._super.included(app);
    app.import('vendor/music-player/music-player.css');
  }
};
