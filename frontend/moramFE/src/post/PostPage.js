import React, { useState, useEffect } from "react";
import { View, StatusBar, TextInput, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from "react-native-vector-icons/Ionicons";
import EvilIcon from "react-native-vector-icons/EvilIcons";

const PostPage = ({ navigation }) => {

    const [image, setImage] = useState(null);
    const [diray, setDiary] = useState("Autumn is an interesting season, even in the metaphor of life, is a time of decline, of loss, but also intense and haunting beauty.");
    const [bottomShow, setBottomShow] = useState(true)


    const selectImage = () => {
        launchImageLibrary({includeBase64: true, selectionLimit: 0}, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else {
                setImage(response);
            }
        })
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '2022/05/15',
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name='ios-arrow-back-sharp' size={40} color='#cfcfcf' />
                </TouchableOpacity>
            ),
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
                <View style={styles.contentsContainer}>
                    {image != null ? (
                        <Image
                            source={{uri: image.assets[0].uri}}
                            style={styles.choosedImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <TouchableOpacity
                            onPress={selectImage}
                            style={styles.imageContainer}>
                            <Icon name="image" size={120} color="#9293c3" />
                            <Text style={styles.chooseMent}>Upload a Picture</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.hashTagBox}>
                        <Text style={styles.hashTag}># sky</Text>
                        <Text style={styles.hashTag}># purple</Text>
                </View>
                <TextInput
                    value={diray}
                    onBlur={() => setBottomShow(true)}
                    onFocus={() => setBottomShow(false)}
                    onChangeText={text => setDiary(text)}
                    style={styles.diaryInput}
                    multiline={true}
                />
                <View style={styles.submitIconBox}>
                    <TouchableOpacity style={bottomShow ? styles.submitButton : {display: 'none'}}>
                        <EvilIcon name="pencil" size={55} color="#fff" style={styles.submitIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.clearAllButton} onPress={() => setDiary('')}>
                    <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

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
        // borderWidth: 2,
        // borderColor: '#ffb687',
    },
    choosedImage: {
        width: width * 0.78,
        height: width * 0.78
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
        fontFamily: 'Inter-Bold',
    },
    hashTagBox: {
        width: width * 0.85,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: width * 0.05,
        borderWidth: 2,
        borderColor: 'black'
    },
    hashTag: {
        fontFamily: 'Inter-Medium',
        color: '#9293c3',
        fontSize: width * 0.04,
        padding: 0,
        marginRight: width * 0.04,
    },
    diaryInput: {
        width: width * 0.85,
        minHeight: width * 0.12,
        fontFamily: 'Inter-Medium',
        fontSize: width * 0.038,
        color: '#413f66',
        textAlign: 'center'
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
        borderRadius: (width * 0.13) * 0.5,
        backgroundColor: '#9293c3'
    },
    submitIconBox: {
        width : width * 0.85,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        bottom: 0,
        marginBottom: width * 0.085,
        borderWidth: 2,
        borderColor: 'black'
    },
    clearAllButton: {
        marginLeft: width * 0.05,
        position: 'absolute',
        right: width * 0.05,
        bottom: 0,
        marginBottom: width * 0.12,
        borderColor: 'black',
        borderWidth: 2
    },
    clearAllText: {
        fontFamily: 'Inter-Medium',
        fontSize: width * 0.038,
        color: '#cfcfcf'
    }
})

export default PostPage;