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

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainPage from './src/main/MainPage';
import FeedPage from './src/feed/FeedPage';
import PostPage from './src/post/PostPage';
import ChatPage from './src/chat/ChatPage';
import DiaryDetailPage from './src/feed/DiaryDetailPage';

import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Feed"
          component={FeedPage}
          // options={{
          //   headerShown: false,
          //   contentStyle: {
          //     backgroundColor: 'white',
          //   },
          options={{
            headerRight: () => (
              <Icon name="search-sharp" size={20} color="#000" />
            ),
            headerTitleStyle: {
              fontFamily: 'Inter-Medium',
            },
            headerShadowVisible: false,
            headerStyle: {
              elevation: 0,
            },
            headerTitleAlign: 'center',
            contentStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="Post"
          component={PostPage}
          options={{
            headerRight: () => (
              <Icon
                name="ios-ellipsis-horizontal-sharp"
                size={30}
                color="#cfcfcf"
              />
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
            },
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatPage}
          options={{
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
            },
          }}
        />
        <Stack.Screen
          name="DiaryDetail"
          component={DiaryDetailPage}
          options={{
            headerRight: () => (
              <Icon
                name="ios-ellipsis-horizontal-sharp"
                size={30}
                color="#cfcfcf"
              />
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
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
