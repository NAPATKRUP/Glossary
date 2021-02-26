import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconImage from '../../assets/profile.png';
import EvaIcon from '../EvaIcon';
import colors from '../../constants/colors';

const VocabList = ({ item, handleDetail }) => (
  <TouchableOpacity delayPressIn={0} onPress={() => handleDetail(item)}>
    <Layout style={styles.iconContain}>
      <Image
        style={styles.icon}
        source={IconImage}
      />
    </Layout>
    <Layout style={styles.vocabText}>
      <Text numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
      <Text>
        <EvaIcon color="#ff3d71" name="heart" size={15} />
        <Text>{` ${item.like.length}`}</Text>
      </Text>
    </Layout>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  icon: {
    height: hp('15%'),
    width: wp('30%'),
    borderRadius: 10,
  },
  iconContain: {
    borderColor: colors.primary,
    borderWidth: 4,
    padding: 10,
    margin: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  vocabText: {
    maxWidth: wp('40%') + 5,
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default VocabList;
