'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');


export default class FeedImage extends Component {

  render() {
    const image = this.props.image;
    const url = `https://picsule.herokuapp.com${image.url}`;
    console.log("URL", url);
    return (
      <View>
        <Image source={{uri: url}} style={styles.feedImage} />
        <Icon name="arrow-graph-up-right" size={30} color="#900" />
      </View>
    );
  }

}


const styles = StyleSheet.create({

  feedImage: {
    width: 400,
    height: 400
  }

});
