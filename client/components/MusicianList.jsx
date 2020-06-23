import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity, Image, Button } from 'react-native';
import axios from 'axios';

let instruments = [ 'piano','vocals','guitar','drums','bass','saxophone','banjo','fiddle','violin','trumpet','flute','oboe','clarinet','trombone','french horn','xylophone','triangle','tambourine','cello' ];

export default class MusicianList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      musicians: []
    };
    this.getMusicians = this.getMusicians.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.getMusicians(this.props.latitude,this.props.longitude,this.props.seeking)
  }

  getMusicians(lat, lng, seeking) {
    console.log("From getMusicians:", seeking)
    axios.get(`http://127.0.0.1:3000/musicians?lat=${lat}&lng=${lng}&seeking=${JSON.stringify(seeking)}`)
      .then((response) => {
        let data = response.data;
        let enhancedData = data.map(item => {
          let container = [];
          for (let i = 0; i < item.abilities.length; i++) {
            item.newInstruments = instruments[item.abilities[i][0]];
            container.push(item.newInstruments)
          }
          item.skills = container;
          item.selected = false;
          item.selectedClass = styles.list;
          return item;
        });
        this.setState({
          musicians: enhancedData
        });
      }).catch(error => {
        this.setState({ loading: false });
      });
  }

  renderItem = data =>
    <TouchableOpacity
      style={[styles.list]}
      onPress={() => console.log('Clicked!')}>
      <Text style={styles.lightText}>  {data.item.first_name + ' ' + data.item.last_name}  </Text>
      <Text style={styles.location}> Location: {data.item.city + ', ' + data.item.state}  </Text>
      <Text style={styles.abilities}> Abilities: {data.item.skills.join(', ')} </Text>
    </TouchableOpacity>

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nearby Musicians</Text>
        <FlatList
            data={this.state.musicians}
            renderItem={item => this.renderItem(item)}
            keyExtractor={item => item.id.toString()}
            extraData={this.state}
          />
        </View>
    )
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
    flexDirection: "column",
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
    fontSize: 15,
    textAlign: "left"
  },
  location: {
    color: "#f7f7f7",
    width: "100%",
    paddingBottom: 5,
    fontSize: 10,
    textAlign: "left"
  },
  abilities: {
    color: "#f7f7f7",
    width: "100%",
    fontSize: 10,
    textAlign: "left"
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