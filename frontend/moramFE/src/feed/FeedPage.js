import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GestureRecognizer from 'react-native-swipe-gestures';
import {month} from '../main/YearMonthHeader';
import axios from 'axios';
import {HOST} from '../../ipConfig';

const FeedPage = ({navigation}) => {
  let sampleImage =
    'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcineplay%2F8f35c2b78a684c8cbd304d322c97415b.jpg';
  const [diaries, setDiaries] = useState([]);
  const [contents, setContents] = useState([
    {
      postId: 0,
      date: '2022-05-15',
      content: '첫번째 일기',
      pictures: [
        'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcineplay%2F8f35c2b78a684c8cbd304d322c97415b.jpg',
      ],
    },
    {
      postId: 1,
      date: '2022-05-15',
      content: '두번째 일기',
      pictures: [
        'https://img.huffingtonpost.com/asset/5e8d1d1e2500007900eaf1ee.jpeg?cache=sajSoCwOYV&ops=scalefit_630_noupscale',
        'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcineplay%2F8f35c2b78a684c8cbd304d322c97415b.jpg',
      ],
    },
    {
      postId: 2,
      date: '2022-05-15',
      content: '두번째 일기',
      pictures: [
        'https://img.huffingtonpost.com/asset/5e8d1d1e2500007900eaf1ee.jpeg?cache=sajSoCwOYV&ops=scalefit_630_noupscale',
        'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcineplay%2F8f35c2b78a684c8cbd304d322c97415b.jpg',
      ],
    },
  ]);

  const getAllDiaries = () => {
    axios.get(`${HOST}/board/getAllDiaries`).then(res => {
      setDiaries(res.data.reverse());
      console.log(res.data);
    });
  };

  const renderCards = diaries.map((data, index) => {
    let date = data.date.slice(-2);
    let cardMonth = parseInt(data.date.slice(5, 7)) - 1;
    let imageHost = HOST + '/images/';
    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DiaryDetail', {
              images: data.fileNames,
              contents: data.contents,
              date: data.date,
              hashtags: data.hashTags,
            })
          }
          activeOpacity={0.8}
          style={styles.cardImageBox}>
          <View style={styles.imageCover}>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.monthText}>{month[cardMonth]}</Text>
          </View>
          {data.fileNames.length > 1 ? (
            <View style={styles.multipleImages}>
              <Icon
                name="copy"
                color="#9293c3"
                size={25}
                style={[
                  styles.multipleIcon,
                  {
                    transform: [{scaleX: -1}],
                  },
                ]}
              />
              <Image
                style={styles.cardImage}
                source={{uri: imageHost + data.fileNames[0]}}
                alt="image"
              />
            </View>
          ) : (
            <Image
              style={styles.cardImage}
              source={
                data.fileNames.length == 0
                  ? {uri: sampleImage}
                  : {uri: imageHost + data.fileNames[0]}
              }
              alt="image"
            />
          )}
        </TouchableOpacity>
      </View>
    );
  });

  const onSwipeLeft = gestureState => {
    console.log('You swiped Left');
    navigation.navigate('Main');
  };

  const swipeConfig = {
    velocityThreshold: 0.9,
    directionalOffsetThreshold: 80,
    gestureIsClickThreshold: 10,
  };

  useEffect(() => {
    let today = new Date();
    navigation.setOptions({
      headerTitle: today.getFullYear().toString(),
    });
    getAllDiaries();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GestureRecognizer
        onSwipeLeft={state => onSwipeLeft(state)}
        config={swipeConfig}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          <View style={styles.feedContainer}>{renderCards}</View>
        </ScrollView>
      </GestureRecognizer>
    </SafeAreaView>
  );
};

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedContainer: {
    width: width,
    display: 'flex',
    alignItems: 'center',
    marginTop: width * 0.01,
    // flex: 1
    // marginBottom: width * 0.2,
  },
  cardContainer: {
    width: width * 0.9,
    minHeight: width,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262444',
    marginBottom: width * 0.05,
    borderTopLeftRadius: width * 0.03,
    borderTopRightRadius: width * 0.03,
    borderBottomLeftRadius: width * 0.03,
    borderBottomRightRadius: width * 0.03,
  },
  cardImageBox: {
    shadowColor: '#00000',
    position: 'relative',
    elevation: 10,
    flexDirection: 'row',
    marginBottom: width * 0.07,
    width: width * 0.9,
    height: width * 0.6,
    borderRadius: 20,
  },
  imageCover: {
    position: 'absolute',
    zIndex: 5,
    width: width * 0.25,
    height: width * 0.6,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Inter-Bold',
    fontSize: width * 0.08,
    color: '#9293c3',
  },
  monthText: {
    fontFamily: 'Inter-Medium',
    fontSize: width * 0.03,
    color: '#9293c3',
  },
  multipleIcon: {
    position: 'absolute',
    zIndex: 7,
    right: width * 0.03,
    top: width * 0.03,
  },
  cardImage: {
    width: width * 0.9,
    height: width * 0.6,
    borderRadius: 20,
  },
});

export default FeedPage;
