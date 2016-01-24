'use strict';

import React, {
  Component,
  StyleSheet,
  CameraRoll,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  NativeModules,
  TextInput,
} from 'react-native';

const { BlurView } = require('react-native-blur');

import MoodContainer from './MoodContainer';


const moodInt = {
  'very-sad': 1,
  'sad': 2,
  'neutral': 3,
  'happy': 4,
  'very-happy': 5
}


export default class MoodInput extends Component {

  state = {
    mood: null,
    caption: ''
  };

  onMoodChange(name) {
    this.setState({ mood: moodInt[name] })
  }

  onSubmitForm() {
    console.log('on submit form');
    const url = 'https://picsule.herokuapp.com/myapp/setMood/';
    fetch(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.props.postID,
        mood: this.state.mood,
        caption: this.state.caption
      })
    })
      .then(resp => resp.json())
      .then(respData => {
        console.log('responded with', respData);
        if (respData.status == 'ok') {
          this.props.hideMood();
        }
      })
  }

  render() {
    return (
      <BlurView style={moodStyle.container} blurType="dark">
        <Text style={moodStyle.moodTitle}>{"How do you feel?"}</Text>
        <MoodContainer onChange={this.onMoodChange.bind(this)}/>
        <Text style={moodStyle.moodTitle}>{"What is going on?"}</Text>
        <TextInput style={moodStyle.captionInput}
          onChangeText={(text) => this.setState({caption: text})}
          value={this.state.caption}
        />
        <TouchableHighlight style={moodStyle.btnContainer} onPress={this.onSubmitForm.bind(this)}>
          <Text style={moodStyle.textBtn}>Submit</Text>
        </TouchableHighlight>
      </BlurView>
    );
  }
}

const moodStyle = StyleSheet.create({

  btnContainer: {
    margin: 30,
  },

  textBtn: {
    color: '#eee',
    padding: 14,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#444'
  },

  captionInput: {
    color: 'white',
    padding: 5,
    height: 40,
    margin: 20,
    borderColor: 'gray',
    borderWidth: 1
  },

  container: {
    position: 'absolute',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    flex: 1
  },

  moodTitle: {
    fontWeight: 'bold',
    color: 'white',
    margin: 20,
  }

})
