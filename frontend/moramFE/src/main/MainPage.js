import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import { Calendar } from "react-native-calendars";
import YearMonthHeader from "./YearMonthHeader";
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios'

const MainPage = ({navigation}) => {

    const testDjango = async () => {
        axios.get('http://192.168.147.148:8000/')
    }
    
    
    // let getDisablesDates = () => {
    //     let today = new Date()
    //     let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    //     let customToday = { }

    //     customToday[date] = {customStyles: {
    //         container: {
    //           backgroundColor: 'green'
    //         },
    //         text: {
    //           color: 'black',
    //           fontWeight: 'bold'
    //         }
    //     }}
    //     console.log(customToday)
    //     return customToday
    // }
    let today = new Date()
    let markedDay = {}
    let dates = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    console.log(dates)
    let day = '2022-05-15'
    

    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
                <View style={styles.background}>
                <YearMonthHeader />
                <Calendar 
                    style={{
                        marginLeft: '5%',
                        marginRight: '5%'
                    }}
                    markingType={"custom"}
                    markedDates={{
                        [day]: {
                            customStyles: {
                              container: {
                                backgroundColor: '#a2a2d8',
                                borderRadius: 5
                              },
                              text: {
                                color: 'black',
                                fontWeight: 'bold'
                              }
                            }
                        },
                    }}
                    hideArrows={true}
                    enableSwipeMonths={true}
                    disabledDaysIndexes={[0, 6]}
                    theme={{
                        textSectionTitleDisabledColor: '#6a69a0',
                        textDefaultColor: '#000000',
                        // textDayFontWeight: 'bold',
                        // textDayHeaderFontWeight: 'bold',
                        textDayHeaderFontFamily: 'Inter-ExtraBold',
                        textDayFontFamily: 'Inter-Bold'
                    }}
                    renderHeader={() => {
                        return <></>
                    }}
                />
                <View style={styles.gotoPostIconBox}>
                    {/* <TouchableOpacity style={styles.addIconButton} onPress={() => navigation.navigate('Post')}> */}
                    <TouchableOpacity style={styles.addIconButton} onPress={() => {testDjango()}}>
                        {/* <Icon name="add" size={53} color="#fff" /> */}
                        <AwesomeIcon name="plus" size={53} color="#fff" />
                    </TouchableOpacity>
                </View>
                </View>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    background: {
        // paddingTop: StatusBar.currentHeight,
        width: width,
        height: height + StatusBar.currentHeight,
        // display: 'flex',
        borderWidth: 3,
        borderColor: 'black'
    },
    gotoPostIconBox: {
        width: width,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        paddingTop: width * 0.05,
        marginBottom: width * 0.085,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'black'
    },
    addIconButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.13,
        height: width * 0.13,
        borderRadius: (width * 0.13) * 0.5,
        backgroundColor: '#9293c3'
    },
    addIcon: {
        borderRadius: 30
    }
})

export default MainPage;