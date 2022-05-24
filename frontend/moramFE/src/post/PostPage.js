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

const PostPage = ({navigation, route}) => {
  let {today} = route.params;
  const [images, setImages] = useState([]);
  const [prepareChat, setPrepareChat] = useState(false);
  const [update, setUpdate] = useState(null);
  const [newHashTag, setNewHashTag] = useState('');
  const [hashTag, setHashTag] = useState([
    '날씨 한강 기분',
    '사람 한강',
    '사람 한강 오랜만',
    '날씨 한강',
    '주말 사람 한강',
  ]);
  // const [bottomShow, setBottomShow] = useState(true);
  const [diary, setDiary] = useState('오늘의 일기. 일기를 씁시다아아');
  const [afterChat, setAfterChat] = useState(false);

  const updateAfterChat = (keywords, myPg) => {
    console.log('keywords at postpage: ', keywords);
    setHashTag(keywords);
    setDiary(myPg);
    setAfterChat(true);
  };

  const makeDiary = () => {
    console.log('upload diary ', diary, today);

    let imageConfig = [];
    for (let i = 0; i < images.length; i++) {
      imageConfig.push(images[i].fileName);
    }

    let hashtagConfig = [];
    for (let i = 0; i < hashTag.length; i++) {
      hashtagConfig.push(hashTag[i]);
    }

    let config = {
      date: today,
      contents: diary,
      fileNames: imageConfig,
      hashTags: hashtagConfig,
    };

    axios.post(`${HOST}/board/uploadDiary`, config).then(res => {
      console.log(res.data);
      navigation.goBack();
    });
  };

  const selectImage = () => {
    launchImageLibrary({includeBase64: true, selectionLimit: 0}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setImages(response.assets);
        console.log(response.assets[0].fileName);
      }
    });
  };

  const getDiaryWithPororo = () => {
    let diary =
      '오랜만에 영화관에 가서 좋았어. 다음 번에 또 가야지. 팝콘도 맛있었어.';
    axios
      .post(`http://47eb-34-83-145-183.ngrok.io/getParagraph/${diary}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {diary: diary},
        method: 'POST',
      })
      .then(res => {
        console.log(res.data);
      });
  };

  const getCaptionWithPororo = () => {
    let files = {
      base64: [],
      filename: [],
    };

    for (let i = 0; i < images.length; i++) {
      files.base64.push(images[i].base64);
      files.filename.push(images[i].fileName);
    }
    axios
      .post(`${FASTAPI}/getCaption`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(files),
        method: 'POST',
      })
      .then(res => {
        let result = Object.values(res.data['captions']);
        let qFormat = {
          caption: result[0],
          num: -1,
        };
        console.log(result);
        // axios
        //   .post(`${FASTAPI}/getQuestion/${result[0]}`, {
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: {caption: result[0]},
        //     method: 'POST',
        //   })
        axios
          .post(`${FASTAPI}/getQuestion/${result[0]}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            body: {caption: result[0]},
            method: 'POST',
          })
          .then(res => {
            console.log(res.data);
            navigation.navigate('Chat', {
              updateAfterChat: updateAfterChat,
              today: today,
              images: images,
              imageNum: 0,
              captions: result,
              question: res.data[0],
              answerList: [],
            });
          });
      });
  };

  const uploadImageToDrive = () => {
    let files = {
      base64: [],
      filename: [],
    };

    for (let i = 0; i < images.length; i++) {
      files.base64.push(images[i].base64);
      files.filename.push(images[i].fileName);
    }

    axios
      .post(`http://1036-34-83-145-183.ngrok.io/uploadImage`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(files),
        method: 'POST',
      })
      .then(res => {
        console.log(res.data['captions']);
      });
  };

  const uploadImage = () => {
    setPrepareChat(true);
    let config = [];
    for (let i = 0; i < images.length; i++) {
      config.push({
        uri: images[i].base64,
        fileName: images[i].fileName,
      });
    }

    axios.post(`${HOST}/board/uploadImage/`, config).then(res => {
      console.log(res.data);
      let captions = [];
      let uries = [];
      for (let i = 0; i < images.length; i++) {
        let uri = HOST + '/images/' + images[i].fileName;
        uries.push(uri);
      }

      getCaptionWithPororo();
    });
  };

  const getImage = () => {
    axios.get(`${HOST}/board/getImage/`);
  };

  const showSelectedImages = () => {
    let contents = [];
    for (let i = 0; i < images.length; i++) {
      // console.log(images[i].base64)
      contents.push(
        <Image
          key={i}
          style={styles.choosedImage}
          resizeMode="cover"
          source={{uri: images[i].uri}}
        />,
      );
    }
    return contents;
  };

  const imageCaptioning = () => {
    let uri = 'http://192.168.147.148:8080/images/sample.png';
    axios
      .post(`${FLASK}/getCaption`, JSON.stringify(uri), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(res.data);
        return res.data;
      });
  };

  const getQuestion = () => {
    let caption = '휴대폰으로 나무 사진을 찍는 사람이 있다.';
    axios
      .post(
        'http://192.168.147.148:8000/getQuestion',
        JSON.stringify(caption),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        console.log(res.data);
      });
  };

  const removeHashTag = tag => {
    let updatedHashTag = hashTag;
    updatedHashTag = updatedHashTag.filter(item => item !== tag);
    setHashTag(updatedHashTag);
  };

  const addHashTag = () => {
    let updatedHashTag = hashTag;
    updatedHashTag.push(newHashTag);
    setHashTag(updatedHashTag);
    setUpdate(newHashTag);
    setNewHashTag('');
    console.log('update hash tag; ', hashTag);
  };

  const renderHashTags = hashTag.map((data, index) => {
    return (
      <TouchableOpacity
        onPress={() => removeHashTag(data)}
        key={index}
        style={styles.hashTagRounder}>
        <Text style={styles.hashTag}>#{data}</Text>
        {/* <Icon
          name="remove-circle"
          color="#9293c3"
          size={15}
          style={styles.removeIcon}
        /> */}
      </TouchableOpacity>
    );
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: today.replace(/-/g, '.'),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="ios-arrow-back-sharp" size={40} color="#cfcfcf" />
        </TouchableOpacity>
      ),
    });
  }, [update]);

  console.log(HOST);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}> */}
      <View style={styles.contentsContainer}>
        {images.length != 0 ? (
          <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}>
            {showSelectedImages()}
          </ScrollView>
        ) : (
          <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
            <Icon name="image" size={120} color="#9293c3" />
            <Text style={styles.chooseMent}>사진을 선택해주세요</Text>
          </TouchableOpacity>
        )}
      </View>
      {afterChat ? (
        <>
          <View style={styles.addHashTagBox}>
            <TextInput
              value={newHashTag}
              onChangeText={text => setNewHashTag(text)}
              style={styles.hashTagInput}
              placeholder="해시태그를 입력해보세요"
            />
            <TouchableOpacity onPress={addHashTag}>
              <Icon name="checkmark-circle-outline" color="#9293c3" size={35} />
            </TouchableOpacity>
          </View>
          <View style={styles.hashTagBox}>{renderHashTags}</View>
        </>
      ) : (
        <>
          {images.length != 0 ? (
            <View style={styles.hashTagBox}>
              <Text style={styles.hashTag}># 아래 버튼을 터치해주세요</Text>
              <Text style={styles.hashTag}># 곧 채팅이 시작됩니다</Text>
            </View>
          ) : (
            <View style={styles.hashTagBox}>
              <Text style={[styles.hashTag, {color: '#808080'}]}>
                # 사진 업로드 후
              </Text>
              <Text style={[styles.hashTag, {color: '#808080'}]}>
                # 아래 버튼을 누르면
              </Text>
              <Text style={[styles.hashTag, {color: '#808080'}]}>
                # AI 와 채팅이 시작됩니다!
              </Text>
            </View>
          )}
        </>
      )}

      {afterChat ? (
        <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
          <TextInput
            value={diary}
            onChangeText={text => setDiary(text)}
            style={styles.diaryInput}
            multiline={true}
          />
        </ScrollView>
      ) : (
        <>
          {images.length != 0 ? (
            <>
              {prepareChat ? (
                <View
                  style={[
                    styles.chatButtonBefore,
                    {backgroundColor: '#ededf9'},
                  ]}>
                  <Icon name="chatbubbles-sharp" color="#9293c3" size={27} />
                  <Text
                    style={[
                      styles.chatButtonText,
                      {color: '#9293c3', marginRight: 10},
                    ]}>
                    채팅 준비중...
                  </Text>
                  <ActivityIndicator size="small" color="#9293c3" />
                </View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.chatButtonBefore,
                    {backgroundColor: '#ededf9'},
                  ]}
                  onPress={uploadImage}
                  // onPress={()=>{navigation.navigate('Chat', {today: today, images: images, imageNum: 0})}}
                >
                  <Icon name="chatbubbles-sharp" color="#9293c3" size={27} />

                  <Text style={[styles.chatButtonText, {color: '#9293c3'}]}>
                    채팅을 시작해보세요!
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.chatButtonBefore}>
              <Icon name="chatbubbles-sharp" color="#808080" size={27} />
              <Text style={styles.chatButtonText}>
                오늘 하루 어땠는지 얘기해봐요!
              </Text>
            </View>
          )}
        </>
      )}

      <View style={afterChat ? styles.submitIconBox : {display: 'none'}}>
        <Text style={[styles.clearAllText, {color: '#fff'}]}>Clear All</Text>
        <TouchableOpacity
          onPress={() => makeDiary()}
          style={styles.submitButton}>
          <EvilIcon
            name="pencil"
            size={50}
            color="#fff"
            style={styles.submitIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={afterChat ? styles.clearAllButton : {display: 'none'}}
          onPress={() => setDiary('')}>
          <Text style={styles.clearAllText}>모두 지우기</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
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
    marginBottom: width * 0.02,
    backgroundColor: '#ededf9',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // borderWidth: 2,
    // borderColor: '#ffb687',
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
  chooseMent: {
    color: '#9293c3',
    fontSize: width * 0.05,
    fontFamily: 'GowunBatang-Bold',
  },
  hashTagBox: {
    width: width * 0.85,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginLeft: width * 0.03,
    marginBottom: width * 0.04,
    // borderWidth: 2,
    // borderColor: 'black',
  },
  hashTag: {
    fontFamily: 'GowunBatang-Regular',
    color: '#9293c3',
    fontSize: width * 0.04,
    padding: 0,
    marginRight: width * 0.04,
  },
  diaryInput: {
    width: width * 0.85,
    maxHeight: width * 0.3,
    fontFamily: 'GowunBatang-Regular',
    lineHeight: width * 0.07,
    fontSize: width * 0.038,
    color: '#413f66',
    textAlign: 'center',
  },
  hashTagInput: {
    borderBottomColor: '#9293c3',
    borderBottomWidth: 1,

    flex: 1,
    padding: 0,
    marginLeft: width * 0.02,
    fontFamily: 'GowunBatang-Regular',
    // lineHeight: width * 0.07,
    // fontSize: width * 0.038,
    color: '#413f66',
  },
  submitIcon: {
    padding: 0,
    marginBottom: width * 0.01,
    // borderColor: 'black',
    // borderWidth: 2
  },
  submitButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.13 * 0.5,
    backgroundColor: '#9293c3',
  },
  submitIconBox: {
    width: width * 0.85,
    // position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    // marginTop: width * 0.1,
    marginBottom: width * 0.03,
    borderWidth: 2,
    borderColor: 'black',
  },
  addHashTagBox: {
    flex: 1,
    width: width * 0.85,
    // backgroundColor: '#ececec',
    // padding: 10,
    borderRadius: 10,
    marginBottom: width * 0.03,
    // width: width * 0.85,
    display: 'flex',
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  hashTagIcon: {
    fontFamily: 'Inter-Bold',
    fontSize: 25,
    color: '#9293c3',
  },
  hashTagRounder: {
    display: 'flex',
    flexDirection: 'row',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  removeIcon: {
    position: 'absolute',
    right: width * 0.01,
    top: -(width * 0.015),
  },
  clearAllText: {
    fontFamily: 'GowunBatang-Regular',
    fontSize: width * 0.038,
    color: '#cfcfcf',
  },
  chatButtonBefore: {
    width: width * 0.85,
    height: width * 0.3,
    backgroundColor: '#ebecf0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatButtonText: {
    color: '#808080',
    fontSize: width * 0.04,
    fontFamily: 'GowunBatang-Regular',
    marginLeft: width * 0.02,
  },
});

export default PostPage;
