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

  onPress(name) {
    console.log('ON PRESS', name);
    this.setState({ selected: name }, () => {
      if (this.props.onChange) {
        this.props.onChange(name);
      }
    });
  },

  render() {
    return (
      <View style={styles.moodContainer}>
        <MoodButton name="very-sad" active={false} icon="emoji-very-sad" onPressIcon={this.onPress.bind(this, 'very-sad')}  />
        <MoodButton name="sad" active={false} icon="emoji-sad" onPressIcon={this.onPress.bind(this, 'sad')} />
        <MoodButton name="neutral" active={false} icon="emoji-neutral" onPressIcon={this.onPress.bind(this, 'neutral')}  />
        <MoodButton name="happy" active={false} icon="emoji-happy" onPressIcon={this.onPress.bind(this,'happy')} />
        <MoodButton name="very-happy" active={false} icon="emoji-very-happy" onPressIcon={this.onPress.bind(this, 'very-happy')} />
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
  }

});
module.exports = MoodContainer;
