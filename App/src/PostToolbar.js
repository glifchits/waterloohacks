'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

var EntypoIcon = require('react-native-vector-icons/Entypo');

var PostToolbarButton = React.createClass({

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
        style={styles.toolbarButton}>
        <EntypoIcon
          name={this.props.icon}
          size={30}
          style={iconStyle}/>
      </TouchableOpacity>
    );
  }

});


var PostToolbar = React.createClass({

  propTypes: {
    onSelectIcon : React.PropTypes.func
  },

  getInitialState() {
    return {
      selected : 'image'
    };
  },

  onPressIcon(name,e) {
    this.setState({ selected : name });
  },

  render() {
    return (
      <View style={styles.toolbar}>
        <PostToolbarButton
          name="weather"
          icon="light-up"
          active={this.state.selected === 'weather'}
          onPressIcon={() => {
            this.setState({ selected : 'weather'});
            this.props.onSelectIcon('weather');
          }}/>
        <PostToolbarButton
          name="image"
          icon="image"
          active={this.state.selected === 'image'}
          onPressIcon={() => {
            this.setState({ selected : 'image'});
            this.props.onSelectIcon('image');
          }}/>
        <PostToolbarButton
          name="music"
          icon="beamed-note"
          active={this.state.selected === 'music'}
          onPressIcon={() => {
            this.setState({ selected : 'music'});
            this.props.onSelectIcon('music');
          }}/>
        <PostToolbarButton
          name="finance"
          icon="line-graph"
          active={this.state.selected === 'finance'}
          onPressIcon={() => {
            this.setState({ selected : 'finance'});
            this.props.onSelectIcon('finance');
          }}/>
      </View>
    );
  }

});

const styles = StyleSheet.create({

  toolbar:{
    backgroundColor:'#fff',
    paddingTop:5,
    paddingBottom:5,
    flexDirection:'row'
  },
  toolbarButton:{
    flex: 1,
  },
  toolbarButtonIcon: {
    textAlign:'center',
    color: '#ccc',
  },

  active: {
    color: '#000'
  },
});

module.exports = PostToolbar;
