import React from 'react';
import { StyleSheet, Text, TextInput, Button, View, } from 'react-native';
import { Header } from 'react-native-elements';

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'build a band', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }} />
    );
  }

}