import React from 'react';
import auth from '@react-native-firebase/auth';

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Loading extends React.Component {
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Chat' : 'GetStarted');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grpTitleView}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => this.props.navigation.navigate('Chat')}>
            <Feather name="arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>ADmin Assistant</Text>
        <ActivityIndicator size="large" color={'rgba(0,172,131,1)'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(41,47,63,1)',
    shadowColor: 'rgba(24,48,63,0.5)',
    shadowOffset: {width: 40, height: 40},
    width: windowWidth,
    height: windowHeight,
  },

  grpTitleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '9%',
    justifyContent: 'flex-start',
  },

  buttonBack: {
    width: 50,
    height: 45,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    //marginTop: '27%',
    //marginBottom: '15%',
  },
});
