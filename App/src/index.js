'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

import FeedImage from './FeedImage';
var EntypoIcon = require('react-native-vector-icons/Entypo');
var EvilIcon = require('react-native-vector-icons/EvilIcons');


class Header extends Component {

  style = {
    marginTop: 20,
    padding: 18,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#0000ff",
  };

  render() {
    return (
      <View style={this.style}>
        <EntypoIcon name="star" size={20} style={styles.logo}/> 
      </View>
    );
  }
}


class ImageFeed extends Component {

  style = {
    flex: 1
  };

  fetchImages() {
    fetch("https://picsule.herokuapp.com/myapp/getImages/")
      .then(resp => resp.json())
      .then(respData => {
        console.log('images', respData);
        this.setState({
          images: respData,
        });
      })
      .done();
  }

  componentDidMount() {
    this.fetchImages();
  }

  render() {
    let content;
    if (this.state && this.state.images) {
      const images = this.state.images;
      content = <ScrollView>{images.map((image, idx) => <FeedImage key={idx} image={image} />)}</ScrollView>;
    } else {
      content = <Text><EvilIcon name="spinner" size={50} /></Text>;
    }

    return (
      <View style={this.style}>{content}</View>
    );
  }
}


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ImageFeed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo: {
    color: '#fff'
  }
});
