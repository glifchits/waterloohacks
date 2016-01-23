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
        <Text>Jolt</Text>
      </View>
    );
  }
}


class ImageFeed extends Component {

  style = {
    flex: 1
  };

  fetchImages() {
    // 43°28'10.1"N 80°32'25.2"W
    const lat = '43.28';
    const lng = '80.32';
    //const CLIENT_ID = '6b5e3ad42b4a4077b2bdecabea5e08de';
    const CLIENT_ID = '6851a8557208436fb7008f50449e1d7c';
    //const CLIENT_SECRET = 'e2d13faaca6d4747aeef954061a38f4e';
    //const URL = "https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&client_id=${CLIENT_ID}";
    const URL = "https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&client_id=6851a8557208436fb7008f50449e1d7c";

    fetch(URL)
      .then(resp => resp.json())
      .then(respData => {
        this.setState({
          images: respData.data,
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
      content = <ScrollView>{images.map(image => <FeedImage key={image.id} image={image} />)}</ScrollView>;
    } else {
      content = <Text>Image Feed loading..</Text>;
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
