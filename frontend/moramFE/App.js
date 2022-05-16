import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainPage from './src/main/MainPage';
import FeedPage from './src/feed/FeedPage';
import PostPage from './src/post/PostPage';

import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Main' 
          component={MainPage} 
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'white'
            }
          }}
        />
        <Stack.Screen 
          name='Feed' 
          component={FeedPage} 
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'white'
            }
          }}
        />
        <Stack.Screen 
          name='Post' 
          component={PostPage} 
          options={{
            headerRight: () => (
              <Icon name='ios-ellipsis-horizontal-sharp' size={30} color='#cfcfcf' />
            ),
            headerTitleStyle: {
              fontFamily: 'Inter-Bold',
            },
            headerShadowVisible: false,
            headerStyle: {
              elevation: 0,
            },
            headerTitleAlign: 'center',
            contentStyle: {
              backgroundColor: 'white',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;
