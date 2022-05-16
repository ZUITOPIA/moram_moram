import React, { useState, useEffect } from "react";
import { View, StatusBar, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const FeedPage = ({ navigation }) => {

    const [contents, setContents] = useState([
        {postId: 0, date: '2022-05-15', content: '첫번째 일기', pictures: [
            'https://cosplayfu-website.s3.amazonaws.com/_Upload/b/Mike-Cosplay-from-Monsters-University-1.jpg'
        ]},
        {postId: 1, date: '2022-05-15', content: '두번째 일기', pictures: [
            'https://img.huffingtonpost.com/asset/5e8d1d1e2500007900eaf1ee.jpeg?cache=sajSoCwOYV&ops=scalefit_630_noupscale',
            'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcineplay%2F8f35c2b78a684c8cbd304d322c97415b.jpg'
        ]},
    ]);

    const renderCards = contents.map((data, index) => {
        return (
            <View key={index} style={styles.cardContainer}>
                <TouchableOpacity>
                    <Image
                        style={styles.cardImage}
                        source={{uri: data.pictures[0]}}
                        alt="image"
                    />
                </TouchableOpacity>
            </View>
        )
    })
   

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
                <View style={styles.feedContainer}>{renderCards}</View>
            </ScrollView>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    feedContainer: {
        width: width,
        display: 'flex',
        alignItems: 'center',
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
    cardImage: {
        marginTop: width * 0.07,
        width: width * 0.76,
        height: width * 0.65,
    },
})

export default FeedPage;