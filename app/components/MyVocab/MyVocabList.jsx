import React from 'react';
import { Layout } from '@ui-kitten/components';
import {
  StyleSheet, Image, Text, TouchableOpacity, Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Constants from 'expo-constants';
import IconImage from '../../assets/profile.png';
import colors from '../../constants/colors';
import EvaIcon from '../EvaIcon';
import i18n from '../../lang/i18n';

const MyVocabList = ({
  item, handleReload, handleDetail, handleEdit,
}) => {
  const handleDelete = () => {
    Alert.alert(
      i18n.t('MyVocab.DeleteTitle'),
      `${i18n.t('MyVocab.DeleteMsg')} ${item.name}`,
      [
        {
          text: i18n.t('MyVocab.CancelButton'),
          style: 'cancel',
        },
        {
          text: i18n.t('MyVocab.DeleteButton'),
          onPress: () => {
            axios.get(`${Constants.manifest.extra.URL_API}/api/data/delete?id=${item.id}&type=${item.type}`).then(() => {
              handleReload();
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableOpacity style={styles.container} delayPressIn={0} onPress={() => handleDetail(item)}>
      <Layout style={styles.card}>
        <Layout style={styles.imageDetail}>
          <Image
            style={styles.icon}
            source={IconImage}
          />
        </Layout>
        <Layout style={styles.textDetail}>
          <Layout style={styles.vocabName}>
            <EvaIcon color={colors.primary} name={item.type === 'private' ? 'lock-outline' : 'book-open-outline'} size={22} />
            <Text style={{ maxWidth: wp('48%'), fontSize: 18, marginLeft: 5 }} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
          </Layout>
          <Layout style={styles.buttonDetail}>
            <TouchableOpacity style={styles.button} onPress={() => handleDelete()} delayPressIn={0}>
              <Text style={styles.textButton}>{i18n.t('MyVocab.Delete')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEdit(item)}
              delayPressIn={0}
            >
              <Text style={styles.textButton}>{i18n.t('MyVocab.Edit')}</Text>
            </TouchableOpacity>
          </Layout>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: hp('15%'),
    width: wp('30%'),
    borderRadius: 10,
  },
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: wp('20%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 4,
    borderRadius: 20,
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  imageDetail: {
    padding: 10,
    borderRadius: 20,
  },
  textDetail: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    maxWidth: wp('55%'),
    minWidth: wp('55%'),
  },
  buttonDetail: {
    flexDirection: 'row',
  },
  textButton: {
    fontSize: 16,
  },
  vocabName: {
    flexDirection: 'row',
    alignContent: 'center',
  },
});
export default MyVocabList;
