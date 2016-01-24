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
    const image = this.props.image;
    const url = `https://picsule.herokuapp.com${image.url}`;
    console.log("URL", url);

    return (
      <Image source={{uri: url}} style={styles.feedImage} />
    );
  }

});

const styles = StyleSheet.create({
  image:{
    height: 400,
    width: 400,
    padding: 15
  },

});

module.exports = ImageContainer;