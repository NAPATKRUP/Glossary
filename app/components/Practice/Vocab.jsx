import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const Practice = ({ item }) => (
  <Layout style={styles.vocabDetail}>
    <Layout style={styles.vocabLayout}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.en.trim()}</Text>
    </Layout>
    <Layout style={styles.transalateLayout}>
      <Text style={{ fontSize: 16 }}>{item.th.trim()}</Text>
    </Layout>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  vocabLayout: {
    padding: wp('3%'),
    backgroundColor: colors.primary,
    width: wp('80%'),
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: hp('8%'),
    justifyContent: 'center',
  },
  transalateLayout: {
    padding: wp('3%'),
    backgroundColor: '#edf0f4',
    width: wp('80%'),
    alignItems: 'center',
    marginBottom: hp('3%'),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default Practice;
