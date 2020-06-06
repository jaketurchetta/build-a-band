import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, } from 'react-native';
import { Input } from 'react-native-elements';

export default class DemographicsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      state: '',
      zip: ''
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
    this.props.handleSubmit(this.state);
  }

  render() {
    return (
      <View>
          <Text>start a band</Text>
            <Input label="First Name:" onChange={this.handleChange}/>
            <Input label="Last Name:" onChange={this.handleChange}/>
            <Input label="Email Address:" onChange={this.handleChange}/>
            <Input label="City:" onChange={this.handleChange}/>
            <Input label="State:" onChange={this.handleChange}/>
            <Input label="ZIP:" onChange={this.handleChange}/>
            <Button type="submit" title="join the band" onSubmit={(event) => this.handleSubmit(event)} />
      </View>
    );


  }
}
