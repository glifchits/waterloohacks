'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');


var BottomMetrics = React.createClass({

  render() {
    return (
      <View style={styles.bottomMetrics}>
        <Text>Wind Speed</Text>
        <Text>Humidity</Text>
        <Text>Precipitation</Text>
      </View>
    );
  }

});

var Temperature = React.createClass({

  render() {
    return (
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureValue}>17&#176;</Text>
        <Text style={styles.feltLike}>Felt like 22&#176;</Text>
      </View>
    );
  }

});

var WeatherIcon = React.createClass({

  render() {
    return (
      <View style={styles.weatherIcon}>
        <Icon 
          name="ios-rainy-outline"
          color="#000"
          size={180}
          style={styles.weatherIconLogo}/>
      </View>
    );
  }

});

var WeatherContainer = React.createClass({

  propTypes: {
    weather : React.PropTypes.object //Weather Data
  },

  render() {
    console.log("WEATHER: ", this.props.weather);
    return (
      <View style={styles.weatherContainer}>
        <View style={styles.topMetrics}>
          <WeatherIcon />
          <Temperature />
        </View>
        <BottomMetrics />
      </View>
    );
  }

});

const styles = StyleSheet.create({

  weatherContainer:{
    flex: 1,
    backgroundColor:'#fff',
    height: 400,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
  },

  topMetrics: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  weatherIcon: {
    flex: 1,
    textAlign: 'center'
  },

  weatherIconLogo: {
    textAlign: 'center',
  },

  temperatureContainer: {
    alignItems: 'center',
    flex: 1,
  },

  temperatureValue: {
    fontSize: 80,
  },

  feltLike: {
    fontSize: 15,
    color: '#666'
  },

  bottomMetrics: {
    alignItems: 'center'
  }

});


module.exports = WeatherContainer;