import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image, Button } from 'react-native';
import axios from 'axios';
import faker from 'faker';
import styled from 'styled-components/native';

export default class AbilitiesForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      instruments: [],
      ids: []
    };
    this.getInstruments = this.getInstruments.bind(this);
    this.selectInstrument = this.selectInstrument.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() { this.getInstruments(); }

  getInstruments = () => {
    this.setState({
      loading: true
    });
    axios.get('http://127.0.0.1:3000/instruments')
      .then((response) => {
        let data = response.data;
        let intrumentsData = data.map(item => {
          item.selected = false;
          item.selectedClass = styles.list;
          return item;
        });
        this.setState({
          loading: false,
          instruments: intrumentsData
        });
      }).catch(error => {
        this.setState({ loading: false });
      });
  };

  selectInstrument = data => {
    data.item.selected = !data.item.selected;
    data.item.selectedClass = data.item.selected ? styles.selected : styles.list;

    const index = this.state.instruments.findIndex(
      item => data.item.id === item.id
    );

    this.state.instruments[index] = data.item;

    this.setState({
      instruments: this.state.instruments,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let container = [];
    for (let i = 0; i < this.state.instruments.length; i++) {
      if (this.state.instruments[i].selected) {
        container.push([this.state.instruments[i].id, 0])
      }
    }
    this.setState({
      ids: container
    }, () => {
      this.props.abilitiesCallback(this.state.ids)
    })
  }

  renderItem = data =>
      <TouchableOpacity
        style={[styles.list, data.item.selectedClass]}
        onPress={() => this.selectInstrument(data)}>
        <Text style={styles.lightText}>  {data.item.instrument.charAt(0).toUpperCase() + data.item.instrument.slice(1)}</Text>
      </TouchableOpacity>

  render() {
    const itemNumber = this.state.instruments.filter(item => item.selected).length;
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Abilities</Text>
        <FlatList
          data={this.state.instruments}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
        />
        <Button
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
    backgroundColor: "#2b2b2c",
    position: "relative",
    width: "100%"
  },
  title: {
    fontSize: 40,
    color: "#fff",
    textAlign: "left",
    marginBottom: 10,
    marginTop: 10
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    padding: 15,
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#262527",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%",
    zIndex: -1,
    borderRadius: 20,
    shadowColor: "#1e1e1f",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 30
  },
  lightText: {
    color: "#f7f7f7",
    width: "100%",
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)"
  },
  selected: { backgroundColor: "#228B22" },
});

// const ListItem = styled.Text`
//   border-radius: 24px;
//   background: #252527;
//   box-shadow:  19px 19px 38px #1f1f20,
//               -19px -19px 38px #373738;
// `;