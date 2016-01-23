'use strict';

import React, {
  Component,
  StyleSheet,
  CameraRoll,
  Text,
  View,
} from 'react-native';

import ActionButton from 'react-native-action-button';


export default class Footer extends Component {

  onPress() {
    console.log('onpress');
    CameraRoll.getPhotos();
  }

  render() {
    return (
      <ActionButton buttonColor="red" onPress={this.onPress} />
    );
  }

}


const styles = StyleSheet.create({

});

