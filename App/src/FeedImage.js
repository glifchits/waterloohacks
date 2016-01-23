'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

var FAIcon = require('react-native-vector-icons/FontAwesome');
var IONIcon = require('react-native-vector-icons/Ionicons');

class PostToolbar extends Component {

  render() {
    return (
      <View style={styles.toolbar}>
        <View style={styles.toolbarButton}>
          <FAIcon name="smile-o" size={30} style={styles.toolbarButtonIcon}/>
        </View>
        <View style={styles.toolbarButton}>
          <IONIcon name="ios-rainy-outline" size={30} style={styles.toolbarButtonIcon}/>
        </View>
        <View style={styles.toolbarButton}>
          <IONIcon name="arrow-graph-up-right" size={30} style={styles.toolbarButtonIcon}/>
        </View>
        <View style={styles.toolbarButton}>
          <IONIcon name="arrow-graph-up-right" size={30} style={styles.toolbarButtonIcon}/>
        </View>
        <View style={styles.toolbarButton}>
          <IONIcon name="arrow-graph-up-right" size={30} style={styles.toolbarButtonIcon}/>
        </View>
      </View>
    );
  };

}


export default class FeedImage extends Component {

  render() {
    const image = this.props.image;
    const url = `https://picsule.herokuapp.com${image.url}`;
    console.log("URL", url);
    return (
      <View style={styles.mainContainer}>
        <Image source={{uri: url}} style={styles.feedImage} />
        <PostToolbar />
      </View>
    );
  }

}


const styles = StyleSheet.create({

  mainContainer:{
    flex: 1,
  },

  feedImage:{
    height: 400,
    width: 400,
    padding: 15
  },

  toolbar:{
    backgroundColor:'#fff',
    paddingTop:5,
    paddingBottom:5,
    flexDirection:'row'
  },
  toolbarButton:{
    flex: 1,
  },
  toolbarButtonIcon: {
    textAlign:'center',
    color: '#ccc'
  },

});
