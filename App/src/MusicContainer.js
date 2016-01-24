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
    song : React.PropTypes.string, //string of form '${song} by ${artist}'
    rank : React.PropTypes.number // Billboard ranking
  },

  render() {
    var match = /'(.*)' by (.*)/.exec(this.props.song);
    return (
      <View style={styles.songGroup}>
        <Text style={styles.song}>{`${this.props.rank}. ${match[1]}`}</Text>
        <Text style={styles.artist}>{match[2]}</Text>
      </View>

    );
  }

});

var MusicContainer = React.createClass({

  propTypes: {
    top100 : React.PropTypes.array //Billboard top 100 songs
  },

  render() {

    if(!!this.props.top100) {
      var content = this.props.top100.map((song, idx) => <SongItem key={idx} rank={idx + 1} song={song} />);
    } else { //no data
      var content = <Text>No Data Found Homes</Text>
    }

    return (
      <View style={styles.musicContainer}>
        <Text style={styles.title}>Billboard Top 10</Text>
        {content}
      </View>
    );
  }

});

const styles = StyleSheet.create({

  musicContainer: {
    paddingLeft: 5,
    paddingRight: 5
  },

  title: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  songGroup:{
    padding: 2
  },

  song:{
    fontSize: 15,
    fontWeight: 'bold'
  },

  artist:{
    fontSize: 10,
    color: '#666'
  }

});


module.exports = MusicContainer;