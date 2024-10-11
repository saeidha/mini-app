import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import EarnScreen from '../screens/EarnScreen';
import FriendsScreen from '../screens/FriendsScreen';
import WalletScreen from '../screens/WalletScreen';

type RootTabParamList = {
  Home: undefined;
  Earn: undefined;
  Friends: undefined;
  Wallet: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function TabNavigator() {
  return (

    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Earn" component={EarnScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      </Tab.Navigator>
    // <h1>Fuck</h1>
  );
};

export default TabNavigator;
