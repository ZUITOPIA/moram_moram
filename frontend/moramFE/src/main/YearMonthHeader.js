import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const month = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const YearMonthHeader = () => {
  let date = new Date();
  // let month = {
  //     0: 'January',
  //     1: 'February',
  //     2: 'March',
  //     3: 'April',
  //     4: 'May',
  //     5: 'June',
  //     6: 'July',
  //     7: 'August',
  //     8: 'September',
  //     9: 'October',
  //     10: 'November',
  //     11: 'December'
  // }

  return (
    <View style={styles.background}>
      <View style={styles.dateInfo}>
        <Text style={styles.yearText}>{date.getFullYear()}</Text>
        <Text style={styles.monthText}>{month[date.getMonth()]}</Text>
      </View>
      <View style={styles.iconBox}>
        <Icon
          name="search-sharp"
          size={22}
          color="#000000"
          style={{paddingRight: '10%'}}
        />
        <Icon
          name="menu"
          size={25}
          color="#000000"
          style={{fontWeight: 'bold'}}
        />
      </View>
    </View>
  );
};

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  background: {
    width: width,
    // height: width * 0.2,
    paddingTop: width * 0.1,
    paddingBottom: width * 0.05,
    marginTop: width * 0.05,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 3,
    // borderColor: 'black'
  },
  dateInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // borderWidth: 3,
    // borderColor: 'black',
    paddingLeft: width * 0.05,
  },
  yearText: {
    color: '#6a69a0',
    fontSize: width * 0.03,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
    marginBottom: '-3%',
    marginLeft: width * 0.03,
  },
  monthText: {
    color: '#000000',
    fontSize: width * 0.06,
    marginTop: width * 0.02,
    fontFamily: 'Inter-Bold',
    marginLeft: width * 0.03,
  },
  iconBox: {
    width: width * 0.2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: width * 0.07,
    paddingTop: width * 0.04,
    marginRight: width * 0.03,
  },
});

export default YearMonthHeader;
export {month};
