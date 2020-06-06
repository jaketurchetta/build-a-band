import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DemographicsForm from './DemographicsForm.jsx';
import NavBar from './Header.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: 'demo'
    }
  }

  handleError(err) {
    console.log(err)
  }

  handleSubmit(data) {
    axios.post('/attendees', data)
      .then((response) => {
        return response.data;
      })
      .then((attendee) => {
        this.setState({
          attendees: [...this.state.attendees, attendee]
        });
      })
      .catch(this.handleError);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.form === 'demo' ? (<DemographicsForm />) : ("Something is wrong.")}
        {this.state.form === 'abilities' ? (<AbilitiesForm />) : ("Something is wrong.")}
        {this.state.form === 'seeking' ? (<SeekingForm />) : ("Something is wrong.")}
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
