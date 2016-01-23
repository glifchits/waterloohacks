'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';


export default class FeedImage extends Component {

  render() {
    const image = this.props.image;
    const url = image.images.standard_resolution.url;
    return (
      <Image source={{uri: url}} style={styles.feedImage} />
    );
  }

}


const styles = StyleSheet.create({

  feedImage: {
    width: 400,
    height: 400
  }

});
