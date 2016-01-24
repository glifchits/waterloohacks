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

var FinanceContainer = React.createClass({

  propTypes: {
    SAndP500Close : React.PropTypes.string, //closing price
    SAndP500Open : React.PropTypes.string //opening price
  },


  render() {

    console.log("SNP: ", this.props.SAndP500Close);
    var SAndP500Close = !!this.props.SAndP500Close ? this.props.SAndP500Close : false;
    var SAndP500Open = !!this.props.SAndP500Open ? this.props.SAndP500Open : false;

    if (SAndP500Close !== 'None' && SAndP500Open !== 'None') {
      var delta = (this.props.SAndP500Close - this.props.SAndP500Open);

      var change, color, arrow;
      if (delta < 0.0001) { //might as well be even
        change = 'Even';
        color = '#000';
        arrow = 'minus-round';
      } else {
        change = `${delta / this.props.SAndP500Open}%`;
        color = delta < 0 ? "#c00" : "#0c0";
        arrow = delta < 0 ? "arrow-down-b" : "arrow-up-b";
      }

      return (
        <View style={styles.financeContainer}>
          <Text style={styles.symbol}>S&P 500</Text>
          <Icon 
            name={arrow}
            color={color}
            size={180}
            style={styles.direction}/>
          <Text style={styles.percentage}>{`${change}`}</Text>
        </View>
      );
    } else { //no data
      return ( 
        <Text>No Data Bro</Text>
      );
    }
  }

});

const styles = StyleSheet.create({

  financeContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  symbol: {
    fontSize: 80,
    textAlign: 'center',
  },

  direction: {
    fontSize: 100,
    textAlign: 'center'
  },

  percentage: {
    fontSize: 50,
    textAlign: 'center',
    color: '#666'
  }

});


module.exports = FinanceContainer;