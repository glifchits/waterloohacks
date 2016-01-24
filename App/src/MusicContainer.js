'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

var SongItem = React.createClass({

  propTypes: {
    song : React.PropTypes.string //string of form '${song} by ${artist}'
  },

  render() {
    return (
      <Text>this.props.song</Text>
    );
  }

});

var MusicContainer = React.createClass({

  propTypes: {
    top100 : React.PropTypes.object //Billboard top 100 songs
  },

  render() {
    var songs = this.props.top100.map((song, idx) => <SongItem key={idx} song={song} />);

    return (
      <View>
        {songs}
      </View>
    );
  }

});

module.exports = MusicContainer;