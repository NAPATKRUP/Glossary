import React, { useState, useEffect } from 'react';
import {
  StyleSheet, FlatList,
} from 'react-native';
import {
  Layout, Spinner, Input, Text,
} from '@ui-kitten/components';
import { useRecoilValue, useRecoilState } from 'recoil';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import Constants from 'expo-constants';
import { Locate, Search } from '../states/atom';
import i18n from '../lang/i18n';
import VocabList from '../components/Home/VocabList';
import colors from '../constants/colors';
import EvaIcon from '../components/EvaIcon';

const Home = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [VocabData, setVocabData] = useState([]);
  const [Refreshing, setRefreshing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [SearchBox, setSearchBox] = useState('');
  const category = ['top', 'official', 'latest'];
  const LocateData = useRecoilValue(Locate);
  const [SearchData, setSearchData] = useRecoilState(Search);

  const handleIndexSelect = (index) => {
    setSelectedIndex(index);
    setLoading(true);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/${category[selectedIndex]}`).then((res) => {
      setVocabData(res.data.response);
      setRefreshing(false);
    });
  };

  const handleSearch = () => {
    setSearchData(false);
    setLoading(true);
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/search?query=${SearchBox}&type=${category[selectedIndex]}`).then((res) => {
      setVocabData(res.data.response);
      setLoading(false);
      setSearchBox('');
    });
  };

  const handleDetail = (item) => {
    props.navigation.navigate('Detail', { item });
  };

  useEffect(() => {
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/${category[selectedIndex]}`).then((res) => {
      setVocabData(res.data.response);
      setLoading(false);
    });
  }, [selectedIndex]);

  return (
    <Layout style={styles.container} locate={LocateData}>
      {SearchData && (
      <Layout>
        <Input
          style={styles.inputSearch}
          placeholder={i18n.t('Home.Search')}
          accessoryRight={() => (
            <EvaIcon color={colors.primary} name="search" size={22} />
          )}
          returnKeyType="search"
          status="info"
          value={SearchBox}
          onChangeText={(text) => { setSearchBox(text); }}
          onSubmitEditing={() => handleSearch()}
        />
      </Layout>
      )}

      <SegmentedControlTab
        tabsContainerStyle={styles.tabContainer}
        tabTextStyle={styles.tabTextStyle}
        tabStyle={styles.tabStyle}
        activeTabStyle={styles.activeTabStyle}
        values={[i18n.t('Home.Top'), i18n.t('Home.Official'), i18n.t('Home.Latest')]}
        selectedIndex={selectedIndex}
        onTabPress={handleIndexSelect}
      />

      {Loading ? (<Layout style={{ flex: 1, justifyContent: 'center' }}><Spinner size="large" style={{ borderColor: colors.primary }} /></Layout>) : []}

      {!Loading && VocabData.length > 0
        ? (
          <FlatList
            numColumns={2}
            contentContainerStyle={styles.listContain}
            data={VocabData}
            renderItem={({ item }) => <VocabList item={item} handleDetail={handleDetail} />}
            keyExtractor={(item) => item.id}
            refreshing={Refreshing}
            onRefresh={handleRefresh}
          />
        ) : []}

      {!Loading && VocabData.length === 0 ? <Layout style={{ flex: 1, justifyContent: 'center' }}><Text>{i18n.t('Home.Empty')}</Text></Layout> : []}

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tabStyle: {
    borderColor: colors.primary,
  },
  activeTabStyle: {
    backgroundColor: colors.primary,
  },
  tabTextStyle: {
    color: 'black',
  },
  tabContainer: {
    width: wp('90%'),
    padding: 10,
  },
  listContain: {
    justifyContent: 'space-between',
  },
  inputSearch: {
    width: wp('90%'),
    padding: 10,
    paddingBottom: 0,
  },
});

export default Home;
