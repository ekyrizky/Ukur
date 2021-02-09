import React from 'react';
import { Image, StyleSheet, View, Text, Button } from 'react-native';

export default class ResultScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri:this.props.navigation.getParam('uri')}} style={styles.image} />
          <Text style={styles.textContainer}>Hasil Pengukuran</Text>
          <Text style={styles.textContainer}>{this.props.navigation.getParam('filename')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Kembali ke beranda"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#52BCD4',
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 380,
    height: 480,
    resizeMode: 'contain',
    marginTop: 3,
  },
  textContainer: {
    alignSelf: 'center',
    fontSize: 30,
  },
  buttonContainer: {
    alignSelf: 'stretch',
  }

})
