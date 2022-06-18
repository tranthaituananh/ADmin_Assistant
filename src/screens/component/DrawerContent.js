import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          )}
          label="Home"
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="account-outline" color={color} size={size} />
          )}
          label="Profile"
          onPress={() => {
            props.navigation.navigate('Profile');
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="bookmark-outline" color={color} size={size} />
          )}
          label="Bookmarks"
          onPress={() => {
            props.navigation.navigate('BookmarkScreen');
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="settings-outline" color={color} size={size} />
          )}
          label="Settings"
          onPress={() => {
            props.navigation.navigate('SettingsScreen');
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="account-check-outline" color={color} size={size} />
          )}
          label="Support"
          onPress={() => {
            props.navigation.navigate('SupportScreen');
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
}
