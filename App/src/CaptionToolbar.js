'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

let moodMap = {
  1:'very-sad',
  2:'sad',
  3:'neutral',
  4:'happy',
  5:'very-happy',
  null: 'neutral'
};

let colourMap = {
  'very-sad': "#E03D3E",
  'sad': "#DF953E",
  'neutral': "#B2D020",
  'happy': "#7DD133",
  'very-happy': "#3EC22E",
};

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
    let { Caption, Mood } = this.props.data;
    let moodName = moodMap[Mood];
    let colour = colourMap[moodName];

    let iconStyles = [styles.moodIcon, { color: colour }];
    let iconName = `emoji-${moodName}`;

    console.log('icon name', iconName);

    let date = new Date(this.props.data.Date);

    return (
      <View style={styles.captionToolbar}>
        <Icon
          name={iconName}
          size={48}
          style={iconStyles} />
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={styles.caption}>{Caption ? Caption : "<No caption>" }</Text>
        </View>
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

  date: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    flex: 0.80,
    color: "#888"
  },

  moodIcon: {
    textAlign:'center',
    color: '#ccc',
    justifyContent: 'center',
    flex: 0.20
  }

});

module.exports = CaptionToolbar;
