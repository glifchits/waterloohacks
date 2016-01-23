'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');

class PostToolbar extends Component {

  render() {
    return (
      <View style={styles.toolbar}>
        <Text style={styles.toolbarButton}>
          <Icon name="arrow-graph-up-right" size={30} style={styles.toolbarButtonIcon}/>
        </Text>
        <Text style={styles.toolbarButton}>
          <Icon name="arrow-graph-up-right" size={30} style={styles.toolbarButtonIcon}/>
        </Text>
        <Text style={styles.toolbarButton}>
          <Icon name="arrow-graph-up-right" size={30} style={styles.toolbarButtonIcon}/>
        </Text>
        <Text style={styles.toolbarButton}>
          <Icon name="arrow-graph-up-right" size={30} style={styles.toolbarButtonIcon}/>
        </Text>
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
      <View>
          <Image source={{uri: url}} style={styles.feedImage} />
          <PostToolbar/>
      </View>
    );
  }

}


const styles = StyleSheet.create({

  toolbar:{
    backgroundColor:'#81c04d',
    paddingTop:10,
    paddingBottom:10,
    flexDirection:'row'
  },

  toolbarButton:{
    textAlign:'center',
    alignSelf: 'stretch',
    width: 50,
  },

  toolbarButtonIcon:{
    color:'#fff',
  },

  feedImage: {
    width: 400,
    height: 400
  }

});
