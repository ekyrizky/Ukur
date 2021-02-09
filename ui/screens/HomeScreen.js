import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {

  state = {
    data: []
  }

  getFiles = async () => {
    try {
      const reply = await (await fetch('http://34.69.230.37:8000/files')).json()
      //console.log(reply)
      this.setState({data: reply})
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.getFiles();
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Daftar Riwayat</Text>
          <TouchableOpacity onPress={()=>this.getFiles()}>
            <Image source={require('../assets/images/refresh.png')} style={styles.refreshImage} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.dataContainer}>
          {(this.state.data || []).map((v, i)=>(
            <TouchableOpacity key={i} style={styles.rowContainer} onPress={() => this.props.navigation.navigate('Result', {
              filename: v.original_filename,
              uri:`http://34.69.230.37:8000/file/${v.unique_filename}`
            })}>
            <View style={styles.square}>
              <Image source={{uri:`http://34.69.230.37:8000/file/${v.unique_filename}`}} style={styles.dataImage}/>
            </View>
            <Text style={styles.textContainer}>{v.original_filename}</Text>
          </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.cameraImage} onPress={() => this.props.navigation.navigate('Camera')}>
          <Image source={require('../assets/images/kamera.png')}  style={styles.cameraImage}/>
        </TouchableOpacity>
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
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
  titleText: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 150,
  },
  refreshImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  dataContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#83D4E6',
    marginLeft: 10,
    marginBottom: 30,
    marginRight: 10,
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 250,
    marginLeft: 10,
    marginBottom: 10,
    borderColor: 'yellow',
    borderBottomWidth: 1,
  },
  dataImage: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
    marginLeft: -10,
  },
  textContainer: {
    fontSize: 20,
    marginLeft: 20,
    paddingTop: 1,
  },
  cameraImage: {
    alignSelf: 'flex-end',
    width: 60,
    height: 50,
    resizeMode: 'contain',

  },

})
