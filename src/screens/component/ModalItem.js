import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const screen = [
  {name: 'Home Chat', des: 'Chat', icon: 'message'},
  {name: 'Listen Paragraph', des: 'ReadText', icon: 'menu-book'},
  {name: 'Sign Out', des: 'SignIn', icon: 'logout'},
];
const ModalItem = props => {
  const onPressItem = des => {
    props.changeModalVisibility(false);
    props.navigate(des);
  };
  const option = screen.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.modalItem}
        key={index}
        onPress={() => {
          onPressItem(item.des);
        }}>
        <Icon name={item.icon} size={40} color="#fff" />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.changeModalVisibility(false);
      }}>
      <View style={styles.modalList}>{option}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 7,
    width: windowWidth,
    height: windowHeight,
  },
  modalList: {
    marginTop: '16%',
    backgroundColor: 'rgba(0,172,131,0.8)',
    width: windowWidth * 0.6,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingTop: '5%',
    padding: 5,
  },
  modalItem: {
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 5,
    marginBottom: '5%',
    shadowOpacity: 0.8,
    shadowOffset: {width: '100%', height: 60, borderRadius: 5},
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: '400',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: '7%',
  },
});

export default ModalItem;
