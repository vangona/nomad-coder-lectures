import React from 'react';
import {Alert} from 'react-native';
import Loading from './Loading';
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "9cf4399f7f1108756026131384240e9d";

export default class extends React.Component {
  state = {
    isLoading: true
  }
  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    console.log(data)
  }
  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords : {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude)
      this.setState({ isLoading: false })
    } catch(error) {
      Alert.alert("can't find you.", "It's sad")
    }
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state
    return isLoading ? <Loading /> : null;
  }
}