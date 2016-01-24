'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

var PostToolbar = require('./PostToolbar');
var MoodContainer = require('./MoodContainer');
var WeatherContainer = require('./WeatherContainer');
var ImageContainer = require('./ImageContainer');
var MusicContainer = require('./MusicContainer');
var FinanceContainer = require('./FinanceContainer');


var FeedImage = React.createClass({

  getInitialState() {
    return {
      view : 'image'
    };
  },

  onSelectIcon(selection) {
    this.setState({ view : selection });
  },

  getView() {
    switch(this.state.view) {
        case 'mood':
            return (<MoodContainer />);
            break;
        case 'weather':
            return (<WeatherContainer />);
            break;
        case 'image':
            return (<ImageContainer image={this.props.image}/>);
            break;
        case 'music':
            return (<MusicContainer/>);
            break;
        case 'finance':
            return (<FinanceContainer/>);
            break;
        default:
            return (<ImageContainer />);
    }
  },

  render() {

    var view = this.getView();

    return (
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          {view}
        </View>
        <PostToolbar onSelectIcon={this.onSelectIcon}/>
      </View>
    );
  }

});



const styles = StyleSheet.create({

  mainContainer:{
    flex: 1,
  },

  contentContainer:{
    height: 400,
    width: 400,
    padding: 15
  },

});


module.exports = FeedImage;
