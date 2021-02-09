import React from 'react';
import { Image, StyleSheet, View, Text, Button } from 'react-native';

export default class ProcessScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/mobil.jpg')} style={styles.logoImage} />
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Harap tunggu, gambar sedang diproses</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Ambil Gambar"
            onPress={() => this.props.navigation.navigate('Result')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#52BCD4',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logoImage: {
    width: 320,
    height: 270,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  }
})
