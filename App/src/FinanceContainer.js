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
    SAndP500Close : React.PropTypes.number, //closing price
    SAndP500Open : React.PropTypes.number //opening price
  },


  render() {

    console.log("SNP: ", this.props.SAndP500Close);

    if (!!this.props.SAndP500Close && !!this.props.SAndP500Open) {
      var delta = (this.props.SAndP500Close - this.props.SAndP500Open);
      var change = delta / this.props.SAndP500Open;
      var color = delta < 0 ? "#c00" : "#0c0";
      var arrow = delta < 0 ? "arrow-down-b" : "#arrow-up-b";

      return (
        <View style={styles.financeContainer}>
          <Text style={styles.symbol}>S&P 500</Text>
          <Icon 
            name={arrow}
            color={color}
            size={180}
            style={styles.direction}/>
          <Text style={styles.percentage}>{`${change}%`}</Text>
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