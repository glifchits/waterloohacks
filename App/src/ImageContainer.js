'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

var ImageContainer = React.createClass({

  render() {
    const url = `https://picsule.herokuapp.com${this.props.imageURL}`;
    return (
      <Image source={{uri: url}} style={styles.image} />
    );
  }

});

const styles = StyleSheet.create({
  image:{
    height: 400,
    width: 400
  },

});

module.exports = ImageContainer;