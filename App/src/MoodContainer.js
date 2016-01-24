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


var MoodButton = React.createClass({

  propTypes: {
    name : React.PropTypes.string,
    active : React.PropTypes.bool,
    icon : React.PropTypes.string,
    onPressIcon : React.PropTypes.func
  },

  render() {
    var iconStyle = [styles.toolbarButtonIcon];

    if(this.props.active) {
      iconStyle.push(styles.active);
    }
    return (
      <TouchableOpacity 
        onPress={this.props.onPressIcon} 
        style={styles.moodButton}>
        <Icon 
          name={this.props.icon} 
          size={30}
          style={styles.moodIcon}/>
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



  render() {
    return (
      <View style={styles.moodContainer}>
        <MoodButton name="very-sad" active="false" icon="emoji-very-sad" onPressIcon={() => { this.setState({ selected : 'very-sad' });}}/>
        <MoodButton name="sad" active="false" icon="emoji-sad" onPressIcon={() => { this.setState({ selected : 'sad' });}}/>
        <MoodButton name="neutral" active="false" icon="emoji-neutral" onPressIcon={() => { this.setState({ selected : 'neutral' });}}/>
        <MoodButton name="happy" active="false" icon="emoji-happy" onPressIcon={() => { this.setState({ selected : 'happy' });}}/>
        <MoodButton name="very-happy" active="false" icon="emoji-very-happy" onPressIcon={() => { this.setState({ selected : 'very-happy' });}}/>
      </View>
    );
  }

});


const styles = StyleSheet.create({

  moodContainer:{
    flex: 1,
    backgroundColor:'#fff',
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
  }

});
module.exports = MoodContainer;