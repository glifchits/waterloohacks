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
    const url = `https://picsule.herokuapp.com${image}`;
    console.log("URL", url);
    return (
      <View>
        <Image source={{uri: url}} style={styles.feedImage} />
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
