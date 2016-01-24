'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

var { createIconSetFromFontello } = require('react-native-vector-icons');
var fontelloConfig = require('../assets/config.json');
var Icon = createIconSetFromFontello(fontelloConfig, 'fontello', '../assets/moods.ttf');


let colourMap = {
  'very-sad': "#E03D3E",
  'sad': "#DF953E",
  'neutral': "#B2D020",
  'happy': "#7DD133",
  'very-happy': "#3EC22E"
};


var MoodButton = React.createClass({

  propTypes: {
    name : React.PropTypes.string,
    active : React.PropTypes.bool,
    icon : React.PropTypes.string,
    onPressIcon : React.PropTypes.func
  },

  render() {
    var iconStyle = [styles.moodIcon];

    if(this.props.active) {
      iconStyle.push({ color: colourMap[this.props.name] });
    }
    return (
      <TouchableOpacity
        onPress={this.props.onPressIcon}
        style={styles.moodButton}>
        <Icon
          name={this.props.icon}
          size={30}
          style={iconStyle}/>
      </TouchableOpacity>
    );
  }

});



var MoodContainer = React.createClass({

  getInitialState() {
    return {
      selected : null
    };
  },

  onPress(name) {
    console.log('ON PRESS', name);
    this.setState({ selected: name }, () => {
      if (this.props.onChange) {
        this.props.onChange(name);
      }
    });
  },

  render() {
    let isActive = (name) => {
      return this.state.selected === name;
    }
    return (
      <View style={styles.moodContainer}>
        <MoodButton name="very-sad" active={isActive('very-sad')} icon="emoji-very-sad" onPressIcon={this.onPress.bind(this, 'very-sad')}  />
        <MoodButton name="sad" active={isActive('sad')} icon="emoji-sad" onPressIcon={this.onPress.bind(this, 'sad')} />
        <MoodButton name="neutral" active={isActive('neutral')} icon="emoji-neutral" onPressIcon={this.onPress.bind(this, 'neutral')}  />
        <MoodButton name="happy" active={isActive('happy')} icon="emoji-happy" onPressIcon={this.onPress.bind(this,'happy')} />
        <MoodButton name="very-happy" active={isActive('very-happy')} icon="emoji-very-happy" onPressIcon={this.onPress.bind(this, 'very-happy')} />
      </View>
    );
  }

});


const styles = StyleSheet.create({

  moodContainer:{
    //flex: 1,
    margin: 20,
    //backgroundColor:'#fff',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  moodButton: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },

  moodIcon: {
    textAlign:'center',
    color: '#ccc',
  },

});
module.exports = MoodContainer;
