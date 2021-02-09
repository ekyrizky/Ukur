import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  async snapPhoto() {
    if (this.camera) {
      console.log('Taking photo');
      const options = {
        quality: 0.2,
        base64: true,
        fixOrientation: true,
        exif: true,
      };

      const photo = await this.camera.takePictureAsync(options);
      console.log(photo.uri)
      const reply = await fetch('http://34.69.230.37:8000/upload/base64', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(photo),
      });

      console.log(reply)
    }

    this.props.navigation.navigate('Home');
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera style={styles.camera} ref={(ref) => { this.camera = ref }} type={this.state.type} ratio="16:9">
            <View style={styles.snap}>
              <TouchableOpacity style={styles.snapButton} onPress={this.snapPhoto.bind(this)} />
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  snap: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  snapButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff"
  },
})
