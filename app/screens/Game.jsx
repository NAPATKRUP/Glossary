import React, { useState, useEffect } from 'react';
import { Layout, Spinner } from '@ui-kitten/components';
import {
  StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import axios from 'axios';
import Constants from 'expo-constants';
import { useRecoilValue } from 'recoil';
import colors from '../constants/colors';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';
import i18n from '../lang/i18n';
import { Locate } from '../states/atom';

const MyVocabList = (props) => {
  const { route } = props;
  const { data } = route.params;

  const [Loading, setLoading] = useState(true);
  const [VocabData, setVocabData] = useState([]);

  const LocateData = useRecoilValue(Locate);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="ios-arrow-back"
            onPress={() => props.navigation.goBack()}
          />
        </HeaderButtons>
      ),
    });

    axios.get(`${Constants.manifest.extra.URL_API}/api/data/glossary_data?id=${data.id}`).then((res) => {
      setVocabData(res.data.response);
      setLoading(false);
    });
  }, []);

  return (
    <Layout style={styles.container} locate={LocateData}>
      {Loading ? <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size="large" style={{ borderColor: colors.primary }} /></Layout> : []}

      {!Loading
        ? (
          <Layout>
            <TouchableOpacity delayPressIn={0} onPress={() => props.navigation.navigate('Choice', { data, VocabData })}>
              <Layout style={styles.card}>
                <Layout style={styles.choice}>
                  <Text style={{ fontSize: 30 }}>{i18n.t('Game.Choice')}</Text>
                </Layout>
              </Layout>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} onPress={() => props.navigation.navigate('FlashCard', { data, VocabData })}>
              <Layout style={styles.card}>
                <Layout style={styles.choice}>
                  <Text style={{ fontSize: 30 }}>{i18n.t('Game.FlashCard')}</Text>
                </Layout>
              </Layout>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} onPress={() => props.navigation.navigate('FillIn', { data, VocabData })}>
              <Layout style={styles.card}>
                <Layout style={styles.choice}>
                  <Text style={{ fontSize: 30 }}>{i18n.t('Game.FillIn')}</Text>
                </Layout>
              </Layout>
            </TouchableOpacity>
            <TouchableOpacity delayPressIn={0} onPress={() => props.navigation.navigate('Charades', { data, VocabData })}>
              <Layout style={styles.card}>
                <Layout style={styles.choice}>
                  <Text style={{ fontSize: 30 }}>{i18n.t('Game.Charades')}</Text>
                </Layout>
              </Layout>
            </TouchableOpacity>
          </Layout>
        )
        : []}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 4,
    borderRadius: 20,
    marginTop: hp('2%'),
    padding: 20,
  },
  choice: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    width: wp('70%'),
  },
});
export default MyVocabList;
