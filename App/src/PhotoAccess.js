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
} from 'react-native';

import ActionButton from 'react-native-action-button';


class CameraRollSelector extends Component {

  onPress(image) {
    console.log('on image press', image);
    console.log('native modules', NativeModules);
    console.log('FileTransfer', NativeModules.FileTransfer);

    let fileName = image.uri;
    let idx = fileName.indexOf('id=') + 3;
    let fileID = fileName.substring(idx, idx+36);

    var obj = {
      uri: image.uri, // either an 'assets-library' url (for files from photo library) or an image dataURL
      uploadUrl: 'https://picsule.herokuapp.com/myapp/',
      fileName: fileID,
      fileKey: 'docfile', // (default="file") the name of the field in the POST form data under which to store the file
      mimeType: undefined, //'multipart/form-data',
      headers: undefined,
      data: undefined // {}
        // whatever properties you wish to send in the request
        // along with the uploaded file
    };
    console.log('obj', obj);
    NativeModules.FileTransfer.upload(obj, (err, res) => {
      console.log('err', err, 'res', res);
      // handle response
      // it is an object with 'status' and 'data' properties
      // if the file path protocol is not supported the status will be 0
      // and the request won't be made at all
    });
  }

  render() {
    console.log('IMAGES:', this.props.images);
    return (
      <View style={selStyle.selContainer}>
        <Text style={selStyle.headerText}>Choose an image</Text>
        <ScrollView style={selStyle.container}>
          <View style={selStyle.imageGrid}>
            { this.props.images.map(image => {
              return (
                <TouchableHighlight onPress={this.onPress.bind(this, image)} key={image.uri}>
                  <Image style={selStyle.image} source={{ uri: image.uri }}/>
                </TouchableHighlight>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

}

const selStyle = StyleSheet.create({
  selContainer: {
    backgroundColor: '#222',
  },
  headerText: {
    padding: 6,
    color: 'rgba(255,255,255, 0.7)'
  },
  container: {
    flex: 1,
    width: 375,
  },
  imageGrid: {
    marginTop: 1,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 91,
    height: 91,
    margin: 1,
  },
});


export default class PhotoAccess extends Component {

  state = {
    showSelector: false,
    photos: []
  };

  onPress() {
    this.fetchPics(16);
    this.setState({
      showSelector: true
    });
  }

  onPhotosFetchedSuccess(data) {
    var photos = data.edges.map((asset) => {
      return asset.node.image;
    });
    this.setState({ photos });
    console.log(photos);
  }

  onPhotosFetchError(error) {
    // Handle error here
    console.error(error);
  }

  fetchPics(count = 10, after) {
    CameraRoll.getPhotos({
      // take the first n photos after given photo uri
      first: count,
      // after
      after: after,
    }, this.onPhotosFetchedSuccess.bind(this), this.onPhotosFetchError.bind(this));
  }

  render() {
    const selector = (this.state.showSelector) ?
      <CameraRollSelector images={this.state.photos} /> :
      <ActionButton buttonColor="red" onPress={this.onPress.bind(this)} />;
    return selector;
  }

}


const styles = StyleSheet.create({

});
