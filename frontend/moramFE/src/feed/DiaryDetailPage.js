import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import {HOST, FLASK, FASTAPI} from '../../ipConfig';

const DiaryDetailPage = ({navigation, route}) => {
  let {images, contents, date, hashtags} = route.params;

  const renderImages = images.map((data, index) => {
    let imageHost = HOST + '/images/';
    return (
      <Image
        key={index}
        style={styles.choosedImage}
        resizeMode="cover"
        source={{uri: imageHost + data}}
      />
    );
  });

  const renderHashTags = hashtags.map((data, index) => {
    return (
      <Text key={index} style={styles.hashTag}>
        #{data}
      </Text>
    );
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: date.replace(/-/g, '.'),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back-sharp" size={40} color="#cfcfcf" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <View style={styles.contentsContainer}>
          <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}>
            {renderImages}
          </ScrollView>
        </View>
        <View style={styles.hashTagBox}>{renderHashTags}</View>
        <View style={styles.diaryBox}>
          <Text style={styles.diaryText}>{contents}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  contentsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.85,
    height: width * 0.85,
    marginTop: width * 0.08,
    marginBottom: width * 0.05,
    backgroundColor: '#ededf9',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  choosedImage: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 10,
  },
  imageContainer: {
    width: width * 0.7,
    height: width * 0.7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededf9',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  hashTagBox: {
    width: width * 0.85,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: width * 0.05,
  },
  hashTag: {
    fontFamily: 'GowunBatang-Bold',
    color: '#9293c3',
    fontSize: width * 0.035,
    padding: 0,
    marginRight: width * 0.03,
  },
  diaryBox: {
    width: width * 0.85,
    minHeight: width * 0.12,
  },
  diaryText: {
    fontFamily: 'GowunBatang-Regular',
    lineHeight: width * 0.07,
    fontSize: width * 0.04,
    color: '#413f66',
    textAlign: 'center',
  },
});

export default DiaryDetailPage;
