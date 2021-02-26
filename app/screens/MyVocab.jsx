import React, { useState, useEffect } from 'react';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { StyleSheet, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import Constants from 'expo-constants';
import MyVocabList from '../components/MyVocab/MyVocabList';
import { Locate, CreateRefresh } from '../states/atom';
import { UserID } from '../states/auth';
import colors from '../constants/colors';
import i18n from '../lang/i18n';

const MyVocab = (props) => {
  const LocateData = useRecoilValue(Locate);
  const UserIDData = useRecoilValue(UserID);
  const CreateRefreshData = useRecoilValue(CreateRefresh);

  const [MyGlossary, setMyGlossary] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/glossary?id=${UserIDData}`).then((res) => {
      setMyGlossary(res.data.response);
      setLoading(false);
    });
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/glossary?id=${UserIDData}`).then((res) => {
      setMyGlossary(res.data.response);
      setRefreshing(false);
    });
  };

  const handleReload = () => {
    setLoading(true);
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/glossary?id=${UserIDData}`).then((res) => {
      setMyGlossary(res.data.response);
      setLoading(false);
    });
  };

  const handleDetail = (item) => {
    props.navigation.navigate('Detail', { item });
  };

  const handleEdit = (item) => {
    props.navigation.navigate('Edit', { item });
  };

  return (
    <Layout style={styles.container} locate={LocateData} refresh={CreateRefreshData}>
      {Loading ? <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size="large" style={{ borderColor: colors.primary }} /></Layout> : []}

      {!Loading && MyGlossary.length > 0
        ? (
          <FlatList
            data={MyGlossary}
            renderItem={({ item }) => (
              <MyVocabList
                item={item}
                handleReload={handleReload}
                handleDetail={handleDetail}
                handleEdit={handleEdit}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            refreshing={Refreshing}
            onRefresh={handleRefresh}
          />
        )
        : []}

      {!Loading && MyGlossary.length === 0 ? <Layout style={{ flex: 1, justifyContent: 'center' }}><Text>{i18n.t('MyVocab.NoGlossary')}</Text></Layout> : []}

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MyVocab;
