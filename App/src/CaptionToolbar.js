'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';


//custom emoticon icons
var { createIconSetFromFontello } = require('react-native-vector-icons');
var fontelloConfig = require('../assets/config.json');
var Icon = createIconSetFromFontello(fontelloConfig, 'fontello', '../assets/moods.ttf');


var CaptionToolbar = React.createClass({

  propTypes: {
    caption : React.PropTypes.string, //user's caption for post
    mood : React.PropTypes.number // mood ranking
  },

  render() {
    return (
      <View style={styles.captionToolbar}>
        <Icon 
          name="emoji-very-happy" 
          size={48}
          style={styles.moodIcon} />
        <Text style={styles.caption}>This is a status that will double at the Caption. Is it not a nice looking piece of text!?</Text>
      </View>
    );
  }

});

const styles = StyleSheet.create({
  captionToolbar: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },

  caption: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    flex: 0.80
  },

  moodIcon: {
    textAlign:'center',
    color: '#ccc',
    justifyContent: 'center',
    flex: 0.20
  }

});

module.exports = CaptionToolbar;