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
        <Text>{`Wind Speed: ${this.props.windSpeed} km/h`}</Text>
        <Text>{`Humidity: ${this.props.humidity}%`}</Text>
        <Text>{`Precipitation: ${this.props.precipitation} mm`}</Text>
      </View>
    );
  }

});

var Temperature = React.createClass({

  propTypes: {
    temp : React.PropTypes.number, //temp
    feelsLike : React.PropTypes.number
  },

  render() {
    return (
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureValue}>{`${this.props.temp}°`}<Text style={styles.temperatureValueUnit}>C</Text></Text>
        <Text style={styles.feltLike}>{`Felt like ${this.props.feelsLike}°`}<Text style={styles.feltLikeValueUnit}>C</Text></Text>
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

    if (!!this.props.weather) {
      var data = this.props.weather;
      var temp = data.tempAvg;
      var feelsLike = data.feelsLikeAvg;
      var windSpeed = data.windSpdAvg;
      var humidity = data.relHumAvg;
      var precipitation = data.precip;

      console.log("WEATHER: ", this.props.weather);
      return (
        <View style={styles.weatherContainer}>
          <View style={styles.topMetrics}>
            <WeatherIcon />
            <Temperature temp={temp} feelsLike={feelsLike}/>
          </View>
          <BottomMetrics windSpeed={windSpeed} humidity={humidity} precipitation={precipitation}/>
        </View>
      );
    } else {//no data
      return (
        <Text>No Data Bro</Text>
      );
    }
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
  },

  weatherIconLogo: {
    textAlign: 'center',
  },

  temperatureContainer: {
    alignItems: 'center',
    flex: 1,
  },

  temperatureValue: {
    fontSize: 70,
  },

  temperatureValueUnit: {
    fontSize: 30,
  },

  feltLike: {
    fontSize: 15,
    color: '#666'
  },

  feltLikeValueUnit: {
    fontSize: 10,
  },

  bottomMetrics: {
    alignItems: 'center'
  }

});


module.exports = WeatherContainer;