import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {Calendar} from 'react-native-calendars';
import YearMonthHeader from './YearMonthHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer from 'react-native-swipe-gestures';
import axios from 'axios';
import {HOST} from '../../ipConfig';

const MainPage = ({navigation}) => {
  const [day, setDay] = useState('');
  const [recentEntries, setRecentEntries] = useState([]);

  const onSwipeRight = gestureState => {
    console.log('You swiped Right');
    navigation.goBack();
  };

  const getRecentEntries = () => {
    axios.get(`${HOST}/board/getAllDiaries`).then(res => {
      setRecentEntries(res.data.reverse());
    });
  };

  let getDateInfo = () => {
    let today = new Date();
    let year = today.getFullYear().toString();
    let month =
      today.getMonth() + 1 < 10
        ? '0' + (today.getMonth() + 1).toString()
        : (today.getMonth() + 1).toString();
    let date =
      today.getDate() < 10
        ? '0' + today.getDate().toString()
        : today.getDate().toString();

    return year + '-' + month + '-' + date;
  };

  const getMarkedDay = () => {
    let markedObject = {};
    let dates = [];
    recentEntries.map(data => {
      dates.push(data.date);
    });
    if (dates.includes(day)) {
      console.log('inclues');
      dates.forEach(data => {
        data == day
          ? (markedObject[data] = {
              selected: true,
              marked: true,
              selectedColor: '#9393c2',
            })
          : (markedObject[data] = {
              dotColor: '#9393c2',
              marked: true,
            });
      });
    } else {
      dates.forEach(data => {
        markedObject[data] = {
          dotColor: '#9393c2',
          marked: true,
        };
      });
      markedObject[day] = {
        selected: true,

        selectedColor: '#9393c2',
      };
    }
    return markedObject;
  };

  const renderCards = recentEntries.slice(0, 2).map((data, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DiaryDetail', {
            images: data.fileNames,
            contents: data.contents,
            date: data.date,
            hashtags: data.hashTags,
          })
        }
        style={styles.recentBackground}
        key={index}>
        <Text style={styles.recentDate}>{data.date.replace(/-/g, '. ')}</Text>
        <Text style={styles.recentText}>
          {data.contents.length > 20
            ? data.contents.slice(0, 20) + '...'
            : data.contents}
        </Text>
      </TouchableOpacity>
    );
  });

  useEffect(() => {
    let today = getDateInfo();
    // let today = '2022-05-06';
    setDay(today);
    getRecentEntries();
  }, []);

  const swipeConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <SafeAreaView>
      <GestureRecognizer
        onSwipeRight={state => onSwipeRight(state)}
        config={swipeConfig}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          <View style={styles.background}>
            <YearMonthHeader />
            <Calendar
              onDayPress={pressedDay => {
                navigation.navigate('Post', {
                  today: pressedDay.dateString,
                });
              }}
              style={{
                marginLeft: '5%',
                marginRight: '5%',
              }}
              markingType={'custom'}
              markedDates={getMarkedDay()}
              hideArrows={true}
              enableSwipeMonths={true}
              disabledDaysIndexes={[0, 6]}
              theme={{
                textSectionTitleDisabledColor: '#6a69a0',
                textDefaultColor: '#000000',
                textDayHeaderFontFamily: 'Inter-ExtraBold',
                textDayFontFamily: 'Inter-Bold',
              }}
              renderHeader={() => {
                return <></>;
              }}
            />
            <Text style={styles.recentSpace}>Recent Entries</Text>
            <View style={styles.recentEntriesBox}>
              <>
                {recentEntries.length == 0 ? (
                  <>
                    <View style={styles.recentBackground}>
                      <Text style={styles.recentDate}>0000. 00. 00</Text>
                      <Text style={styles.recentText}>
                        일기를 가져오는 중입니다...
                      </Text>
                    </View>
                    <View style={styles.recentBackground}>
                      <Text style={styles.recentDate}>0000. 00. 00</Text>
                      <Text style={styles.recentText}>
                        일기를 가져오는 중입니다...
                      </Text>
                    </View>
                  </>
                ) : (
                  renderCards
                )}
              </>
            </View>
            <View style={styles.gotoPostIconBox}>
              <TouchableOpacity
                style={styles.addIconButton}
                onPress={() => navigation.navigate('Post', {today: day})}>
                <AwesomeIcon
                  name="plus"
                  size={40}
                  color="#fff"
                  style={styles.addIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </GestureRecognizer>
    </SafeAreaView>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  background: {
    width: width,
  },
  recentEntriesBox: {
    width: width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gotoPostIconBox: {
    width: width,
    display: 'flex',
    marginTop: width * 0.05,
    marginBottom: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIconButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.13 * 0.5,
    backgroundColor: '#9293c3',
  },
  addIcon: {
    marginTop: width * 0.01,
  },
  recentSpace: {
    color: '#000000',
    fontSize: width * 0.05,
    marginTop: width * 0.05,
    fontFamily: 'Inter-Bold',
    marginLeft: width * 0.07,
    flex: 1,
  },
  recentBackground: {
    width: width * 0.8,
    minHeight: width * 0.1,
    backgroundColor: '#ededf9',
    borderRadius: 7,
    marginTop: width * 0.04,
    overflow: 'hidden',
    paddingTop: width * 0.03,
    paddingBottom: width * 0.03,
  },
  recentDate: {
    color: '#9393c2',
    fontSize: width * 0.03,
    fontWeight: 'bold',
    paddingLeft: width * 0.03,
    paddingBottom: width * 0.01,
  },
  recentText: {
    color: '#373764',
    fontFamily: 'GowunBatang-Bold',
    fontSize: width * 0.04,
    textAlign: 'center',
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,
    paddingTop: width * 0.01,
    paddingBottom: width * 0.01,
  },
});

export default MainPage;
