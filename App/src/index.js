'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

import FeedPost from './FeedPost';
import PhotoAccess from './PhotoAccess';
var EntypoIcon = require('react-native-vector-icons/Entypo');
var EvilIcon = require('react-native-vector-icons/EvilIcons');
var Ionicon = require('react-native-vector-icons/Ionicons');


class Header extends Component {

  style = {
    marginTop: 20,
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#1B98C2",
    flexDirection: 'row'
  };

  render() {
    return (
      <View style={this.style}>
        <Ionicon name="ios-timer" size={26} style={styles.logo}/>
        <Text style={{ padding: 5, color: 'white', fontSize: 18, fontWeight: 'bold' }}>Rearview</Text>
      </View>
    );
  }
}


class Feed extends Component {

  style = {
    flex: 1
  };

  fetchImages() {
    fetch("https://picsule.herokuapp.com/myapp/getImages/")
      .then(resp => resp.json())
      .then(respData => {
        console.log('data', respData);
        respData = respData.reverse();
        this.setState({
          data: respData,
        });
      })
      .done();
  }

  componentDidMount() {
    this.fetchImages();
  }

  render() {
    let content;
    if (this.state && this.state.data) {
      const data = this.state.data;
      content = <ScrollView>{data.map((data, idx) => <FeedPost key={idx} data={data} />)}</ScrollView>;
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
        <Feed />
        <PhotoAccess />
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
