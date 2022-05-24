import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  LogBox,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {HOST, FASTAPI} from '../../ipConfig';

const ChatPage = ({navigation, route}) => {
  let {
    updateAfterChat,
    images,
    today,
    imageNum,
    captions,
    answerList,
    question,
  } = route.params;
  const [chat, setChat] = useState('');
  const [getChat, setGetChat] = useState(false);
  const [q, setQuestion] = useState(question);
  const [answers, setAnswers] = useState([]);
  const [update, setUpdate] = useState(null);

  const storeAnswers = answer => {
    console.log('answerList: ', answerList);
    let newAnswers = answers;
    newAnswers.push(answer);
    setAnswers(newAnswers);
    setChat('');
    setUpdate(answer);
  };

  const goPostPage = data => {
    let keywords = Object.values(data['hashtag']);
    let myPg = data['diary'];
    console.log('keywords: ', keywords, ' myPg: ', myPg);
    navigation.goBack();
    updateAfterChat(keywords, myPg);
  };

  const getNewQuestion = () => {
    answerList.push(...answers);
    setAnswers([]);
    setGetChat(true);
    axios
      .post(`${FASTAPI}/getQuestion/${captions[imageNum]}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {caption: captions[imageNum + 1]},
        method: 'POST',
      })
      .then(res => {
        if (res.data[0] == q) {
          getNewQuestion();
        } else {
          console.log(res.data);
          setGetChat(false);
          setQuestion(res.data[0]);
        }
      });
  };

  const goForward = async () => {
    if (imageNum + 1 === images.length) {
      answerList.push(answers);
      console.log('answerlist: ', answerList);
      let config = {
        answerList: answerList,
      };
      axios
        .post(`${FASTAPI}/getParagraph`, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config),
          method: 'POST',
        })
        .then(res => {
          console.log(res.data);
          goPostPage(res.data);
        });
      // let myPg = [];
      // let answerResult = await answerList.map(data => {
      //   let diary = data.join(' ');
      //   console.log('diary: ', diary);
      //   axios
      //     .post(`${FASTAPI}/getParagraph/${diary}`, {
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: {diary: diary},
      //       method: 'POST',
      //     })
      //     .then(res => {
      //       console.log(res.data);
      //       myPg.push(res.data);
      //       return res.data;
      //     });
      // });
      // console.log('mypg: ', myPg);
      // console.log('answerResult: ', answerResult);
      // let diary = answerList.join(' ');
      // axios
      //   .post(`${FASTAPI}/getParagraph/${diary}`, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: {diary: diary},
      //     method: 'POST',
      //   })
      //   .then(res => {
      //     console.log(res.data);
      //     goPostPage(res.data);
      //     // uploadDiary(res.data)
      //   });
      return;
    } else {
      console.log('answerList forward: ', answerList);
      answerList.push(answers);
      setAnswers([]);
      setGetChat(true);
      navigation.navigate('Chat', {
        updateAfterChat: updateAfterChat,
        images: images,
        today: today,
        imageNum: imageNum + 1,
        captions: captions,
        answerList: answerList,
      });
      axios
        .post(`${FASTAPI}/getQuestion/${captions[imageNum + 1]}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          body: {caption: captions[imageNum + 1]},
          method: 'POST',
        })
        .then(res => {
          console.log(res.data);
          setGetChat(false);
          setQuestion(res.data[0]);
        });
    }
  };

  const renderAnswers = answers.map((data, index) => {
    return (
      <View key={index} style={styles.questionBox}>
        <View style={{flex: 1}} />
        <Text style={[styles.questionText, {backgroundColor: '#ededf9'}]}>
          {data}
        </Text>
        <View style={styles.chatTriangleRight} />
      </View>
    );
  });

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  useEffect(() => {
    console.log(captions);
    navigation.setOptions({
      headerTitle: today.replace(/-/g, '/'),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back-sharp" size={40} color="#cfcfcf" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => goForward()}>
          <Icon
            name={
              imageNum + 1 === images.length
                ? 'checkmark-circle-outline'
                : 'md-play-forward-outline'
            }
            size={30}
            color="#9293c3"
          />
        </TouchableOpacity>
      ),
    });
    // axios.post(`${FASTAPI}/getQuestion/${captions[imageNum]}`, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: {"caption": captions[imageNum]},
    //     method: "POST"
    // }).then((res) => {
    //     console.log(res.data)
    //     setQuestion(res.data[0])
    // })

    return () => {
      imageNum = 0;
    };
  }, [update]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          <View style={styles.contentsContainer}>
            <Image
              source={{uri: images[imageNum].uri}}
              style={styles.choosedImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.chattingBox}>
            <View style={styles.questionBox}>
              {/* <View style={{flex: 1}} /> */}
              <View style={styles.chatTriangle} />
              {getChat ? (
                <Icon
                  name="md-ellipsis-horizontal-sharp"
                  size={20}
                  style={styles.loadingText}
                />
              ) : (
                <Text style={styles.questionText}>{q}</Text>
              )}
            </View>
            {answers.length != 0 && renderAnswers}
          </View>
        </ScrollView>
        <View style={styles.inputSection}>
          <TextInput
            value={chat}
            onChangeText={text => setChat(text)}
            style={styles.chatInput}
            multiline={true}
          />
          <TouchableOpacity onPress={() => getNewQuestion()}>
            <Icon
              name="ios-chatbox-ellipses-outline"
              size={30}
              color="#9293c3"
              style={styles.chatUploadIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => storeAnswers(chat)}>
            <Icon
              name="ios-paper-plane-outline"
              size={30}
              color="#9293c3"
              style={styles.chatUploadIcon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
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
    width: width * 0.8,
    height: width * 0.8,
    marginTop: width * 0.08,
    marginBottom: width * 0.05,
    backgroundColor: '#ededf9',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderWidth: 2,
    // borderColor: '#ffb687',
  },
  choosedImage: {
    width: width * 0.75,
    height: width * 0.75,
  },
  chattingBox: {
    width: width * 0.85,
    marginBottom: width * 0.2,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  questionBox: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: width * 0.03,
  },
  chatTriangle: {
    width: 0,
    height: 0,
    top: width * 0.02,
    borderTopColor: 'transparent',
    borderTopWidth: width * 0.02,
    borderRightWidth: width * 0.04,
    borderRightColor: '#ebecf0',
    borderBottomWidth: width * 0.02,
    borderBottomColor: 'transparent',
  },
  chatTriangleRight: {
    width: 0,
    height: 0,
    top: width * 0.02,
    borderTopColor: 'transparent',
    borderTopWidth: width * 0.02,
    borderLeftWidth: width * 0.04,
    borderLeftColor: '#ededf9',
    borderBottomWidth: width * 0.02,
    borderBottomColor: 'transparent',
  },
  questionText: {
    fontFamily: 'Inter-Medium',
    maxWidth: width * 0.6,
    backgroundColor: '#ebecf0',
    fontSize: 15,
    borderRadius: 10,
    paddingTop: width * 0.01,
    paddingBottom: width * 0.01,
    paddingLeft: width * 0.02,
    paddingRight: width * 0.02,
  },
  loadingText: {
    backgroundColor: '#ebecf0',
    borderRadius: 10,
    padding: width * 0.015,
  },
  inputSection: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebecf0',
  },
  chatUploadIcon: {
    padding: 7,
  },
  chatInput: {
    flex: 1,
    width: width,
    height: width * 0.13,
    backgroundColor: '#ededf9',
    paddingLeft: width * 0.05,
  },
});

export default ChatPage;
