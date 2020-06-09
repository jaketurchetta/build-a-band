import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import faker from 'faker';

export default class AbilitiesForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      seekingInstruments: [],
      ids: []
    };
    this.getInstruments = this.getInstruments.bind(this);
    this.FlatListItemSeparator = this.FlatListItemSeparator.bind(this);
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
          seekingInstruments: intrumentsData
        });
      }).catch(error => {
        this.setState({ loading: false });
      });
  };

  FlatListItemSeparator = () => <View style={styles.line} />;

  selectInstrument = data => {
    data.item.selected = !data.item.selected;
    data.item.selectedClass = data.item.selected ? styles.selected : styles.list;

    const index = this.state.seekingInstruments.findIndex(
      item => data.item.id === item.id
    );

    this.state.seekingInstruments[index] = data.item;

    this.setState({
      seekingInstruments: this.state.seekingInstruments,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let container = [];
    for (let i = 0; i < this.state.seekingInstruments.length; i++) {
      if (this.state.seekingInstruments[i].selected) {
        container.push(this.state.seekingInstruments[i].id)
      }
    }
    this.setState({
      ids: container
    }, () => {
      this.props.seekingCallback(this.state.ids)
    })
  }

  renderItem = data =>
    <TouchableOpacity
      style={[styles.list, data.item.selectedClass]}
      onPress={() => this.selectInstrument(data)}>
      <Text style={styles.lightText}>  {data.item.instrument.charAt(0).toUpperCase() + data.item.instrument.slice(1)}  </Text>
    </TouchableOpacity>


  render() {
    const itemNumber = this.state.seekingInstruments.filter(item => item.selected).length;
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Seeking</Text>
        <FlatList
          data={this.state.seekingInstruments}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
          extraData={this.state}
        />
        <Button
          title="START A BAND"
          color="#228B22"
          onPress={(event) => this.handleSubmit(event)}
          style={styles.button}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    position: "relative"
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
    paddingVertical: 5,
    margin: 3,
    flexDirection: "row",
    backgroundColor: "#000000",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: -1
  },
  lightText: {
    color: "#f7f7f7",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    textAlign: "center"
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)"
  },
  selected: { backgroundColor: "#228B22" },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20
  }
});