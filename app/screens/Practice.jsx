import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, FlatList,
} from 'react-native';
import {
  Layout, Spinner,
} from '@ui-kitten/components';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import axios from 'axios';
import Constants from 'expo-constants';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Vocab from '../components/Practice/Vocab';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';
import colors from '../constants/colors';

const Practice = (props) => {
  const { route } = props;
  const { data } = route.params;

  const [Loading, setLoading] = useState(true);
  const [VocabData, setVocabData] = useState([]);

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
    <Layout style={styles.container}>
      {Loading ? <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size="large" style={{ borderColor: colors.primary }} /></Layout> : []}

      {!Loading ? (
        <Layout style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: RFPercentage(4), marginVertical: 20 }}>{data.name}</Text>
          <FlatList
            data={VocabData}
            renderItem={Vocab}
            keyExtractor={(item) => item.en}
          />
        </Layout>
      ) : []}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
});

export default Practice;
