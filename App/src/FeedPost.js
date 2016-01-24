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


var FeedPost = React.createClass({

  propTypes: {
    data : React.PropTypes.object //the goods from the server
  },

  getInitialState() {
    return {
      view : 'image'
    };
  },

  onSelectIcon(selection) {
    this.setState({ view : selection });
  },

  getView() {
    var data = this.props.data;
    console.log("DATA: ", data);
    switch(this.state.view) {
        case 'mood':
            return (<MoodContainer />);
            break;
        case 'weather':
            return (<WeatherContainer weather={data.Weather}/>);
            break;
        case 'image':
            return (<ImageContainer imageURL={data.url}/>);
            break;
        case 'music':
            return (<MusicContainer top100={data.Top100}/>);
            break;
        case 'finance':
            return (<FinanceContainer SAndP500Close={data.SAndP500Close} SAndP500Open={data.SAndP500Open} />);
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
  },

});


module.exports = FeedPost;
