import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import DemographicsForm from './DemographicsForm.jsx';
import AbilitiesForm from './AbilitiesForm.jsx';
import SeekingForm from './SeekingForm.jsx';
import MusicianList from './MusicianList.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: 'demo',
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      state: '',
      zip: '',
      latitude: 0,
      longitude: 0,
      myInstruments: [],
      seeking: []
    }
    this.demoCallback = this.demoCallback.bind(this);
    this.abilitiesCallback = this.abilitiesCallback.bind(this);
    this.seekingCallback = this.seekingCallback.bind(this);
  }

  demoCallback(data) {
    this.setState({
      form: 'abilities',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      city: data.city,
      state: data.state,
      zip: data.zip,
      latitude: data.latitude,
      longitude: data.longitude
    })
  }

  abilitiesCallback(data) {
    this.setState({
      form: 'seeking',
      myInstruments: data
    })
  }

  seekingCallback(data) {
    this.setState({
      form: 'musician',
      seeking: data
    }, () => {
      axios.post('http://127.0.0.1:3000/musicians', this.state)
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log(err))
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.form === 'demo' ? (<DemographicsForm demoCallback={this.demoCallback} />) : (<Text>Something is wrong.</Text>)}
        {this.state.form === 'abilities' ? (<AbilitiesForm abilitiesCallback={this.abilitiesCallback}/>) : (<Text>Something is wrong.</Text>)}
        {this.state.form === 'seeking' ? (<SeekingForm seekingCallback={this.seekingCallback}/>) : (<Text>Something is wrong.</Text>)}
        {this.state.form === 'musician' ? (<MusicianList latitude={this.state.latitude} longitude={this.state.longitude} seeking={this.state.seeking}/>) : (<Text>Something is wrong.</Text>)}
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
