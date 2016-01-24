'use strict';

import React, {
  Component,
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

var EntypoIcon = require('react-native-vector-icons/Entypo');


class PostToolbar extends Component {

  onIconClick() {
    console.log("CLICK!!!");
    this.setState({ active : true });
  }

  render() {
    return (
      <View style={styles.toolbar}>
        <View style={styles.toolbarButton}>
          <EntypoIcon 
            name="emoji-happy" 
            size={30} 
            style={[styles.toolbarButtonIcon, styles.active]}
            onClick={this.onIconClick.bind(this)}/>
        </View>
        <View style={styles.toolbarButton}>
          <EntypoIcon name="light-up" size={30} style={styles.toolbarButtonIcon}/>
        </View>
        <View style={styles.toolbarButton}>
          <EntypoIcon name="image" size={30} style={styles.toolbarButtonIcon}/>
        </View>
        <View style={styles.toolbarButton}>
          <EntypoIcon name="beamed-note" size={30} style={styles.toolbarButtonIcon}/>
        </View>
        <View style={styles.toolbarButton}>
          <EntypoIcon name="line-graph" size={30} style={styles.toolbarButtonIcon}/>
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

  active: {
    color: '#000'
  }

});
