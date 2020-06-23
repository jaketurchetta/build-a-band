import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';
import GOOGLE_API_KEY from '../../config.js';

export default class DemographicsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      state: '',
      zip: '',
      latitude: 0,
      longitude: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.zip}&key=${GOOGLE_API_KEY}`)
      .then(response => {
        this.setState({
          latitude: response.data.results[0].geometry.location.lat,
          longitude: response.data.results[0].geometry.location.lng
        }, () => {
          this.props.demoCallback(this.state)
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    let title = 'Build-a-band';
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView>
          <Input inputStyle={styles.lightText}
                    labelStyle={styles.lightText}
                    label="First Name:"
                    id="firstName"
                    onChange={this.handleChange}/>
            <Input inputStyle={styles.lightText}
                    labelStyle={styles.lightText}
                    label="Last Name:"
                    id="lastName"
                    onChange={this.handleChange}/>
            <Input inputStyle={styles.lightText}
                    labelStyle={styles.lightText}
                    label="Email Address:"
                    id="email"
                    onChange={this.handleChange}/>
            <Input inputStyle={styles.lightText}
                    labelStyle={styles.lightText}
                    label="City:"
                    id="city"
                    onChange={this.handleChange}/>
            <Input inputStyle={styles.lightText}
                    labelStyle={styles.lightText}
                    label="State:"
                    id="state"
                    onChange={this.handleChange}/>
            <Input inputStyle={styles.lightText}
                    labelStyle={styles.lightText}
                    label="ZIP:"
                    id="zip"
                    onChange={this.handleChange}/>
          </ScrollView>
          <Button type="submit"
                  title="NEXT"
                  color="#228B22"
                  onPress={(event) => this.handleSubmit(event)} />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262527",
    position: "relative",
    width: "100%"
  },
  title: {
    fontSize: 40,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 50
  },
  lightText: {
    color: "#f7f7f7",
    width: "100%",
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20
  },
});