import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const RecentBox = ({contents}) => {
  const renderCards = contents.slice(0, 2).map((data, index) => {
    return (
      <View style={styles.recentBackground} key={index}>
        <Text style={styles.recentDate}>{data.date.replace(/-/g, '. ')}</Text>
        <Text style={styles.recentText}>{data.contents}</Text>
      </View>
    );
  });
  return (
    <View style={styles.recentEntriesBox}>
      <Text style={styles.recentSpace}>Recent Entries</Text>
      {contents ? (
        renderCards
      ) : (
        <View style={styles.recentBackground}>
          <Text style={styles.recentDate}>loading</Text>
          <Text style={styles.recentText}>loading</Text>
        </View>
      )}
    </View>
  );
};

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  recentSpace: {
    color: '#000000',
    fontSize: width * 0.05,
    marginTop: width * 0.05,
    fontFamily: 'Inter-Bold',
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
  },
});

export default RecentBox;
