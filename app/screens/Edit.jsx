import {
  Layout, Input, Text, Spinner,
} from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, TouchableOpacity, Image, Alert, ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Constants from 'expo-constants';
import { useRecoilValue } from 'recoil';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IconImage from '../assets/profile.png';
import colors from '../constants/colors';
import EvaIcon from '../components/EvaIcon';
import CreateVocab from '../components/Create/CreateVocab';
import { Locate } from '../states/atom';
import i18n from '../lang/i18n';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';

const Create = (props) => {
  const { route } = props;
  const data = route.params.item;

  const [GlossaryName, setGlossaryName] = useState('');
  const [Description, setDescription] = useState('');
  const [Word, setWord] = useState('');
  const [Meaning, setMeaning] = useState('');
  const [GlossaryList, setGlossaryList] = useState([]);
  const [Loading, setLoading] = useState(true);

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

    setGlossaryName(data.name);
    setDescription(data.description);
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/glossary_data?id=${data.id}`).then((res) => {
      setGlossaryList(res.data.response);
      setLoading(false);
    });
  }, []);

  const addGlossary = () => {
    if (Word !== '' && Meaning !== '') {
      const WordData = { en: Word.trim(), th: Meaning.trim() };
      GlossaryList.push(WordData);

      setWord('');
      setMeaning('');
    }
  };

  const updateGlossary = () => {
    if (GlossaryName !== '' && Description !== '' && GlossaryList.length >= 5) {
      setLoading(true);
      axios.post(`${Constants.manifest.extra.URL_API}/api/update/glossary_data`, {
        id: data.id,
        data: GlossaryList,
      }).then(() => {
        setGlossaryName('');
        setDescription('');
        setWord('');
        setMeaning('');
        setGlossaryList([]);
        props.navigation.goBack();
        setLoading(false);
      });
    } else if (GlossaryList.length < 5) {
      Alert.alert(
        i18n.t('Edit.Alert'),
        i18n.t('Edit.Below'),
        [
          { text: i18n.t('Edit.OK') },
        ],
      );
    }
  };

  const editAlert = () => {
    Alert.alert(
      i18n.t('Edit.EditAlert'),
      i18n.t('Edit.EditAlertMsg'),
      [
        {
          text: i18n.t('Edit.Cancel'),
          style: 'cancel',
        },
        { text: i18n.t('Edit.Edit'), onPress: () => updateGlossary() },
      ],
      { cancelable: false },
    );
  };

  const removeWord = (index) => {
    Alert.alert(
      i18n.t('Edit.DeleteTitle'),
      i18n.t('Edit.DeleteMsg'),
      [
        {
          text: i18n.t('Edit.Cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('Edit.Delete'),
          onPress: () => {
            const GlossaryArray = GlossaryList;
            const TempSlice1 = GlossaryArray.slice(0, index);
            const TempSlice2 = GlossaryArray.slice(index + 1);
            const TempArray = [...TempSlice1, ...TempSlice2];
            setGlossaryList(TempArray);
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <Layout style={styles.container} locate={LocateData}>
      {Loading ? <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size="large" style={{ borderColor: colors.primary }} /></Layout> : []}

      {!Loading
        ? (
          <ScrollView>
            <Layout style={styles.card}>
              <Layout style={styles.imageDetail}>
                <Image
                  style={styles.icon}
                  source={IconImage}
                />
              </Layout>
            </Layout>
            <Layout style={styles.textDetail}>
              <Input
                status="info"
                style={{ width: wp('70%') }}
                placeholder={i18n.t('Edit.Name')}
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="book-open-outline" size={22} />
                )}
                value={GlossaryName}
                onChangeText={(text) => { setGlossaryName(text); }}
                disabled
              />
            </Layout>
            <Layout style={styles.textDetail}>
              <Input
                multiline
                maxLength={200}
                status="info"
                style={{ width: wp('70%'), maxHeight: hp('12%') }}
                placeholder={i18n.t('Edit.Description')}
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="file-text-outline" size={22} />
                )}
                value={Description}
                onChangeText={(text) => { setDescription(text); }}
                disabled
              />
            </Layout>
            <Text style={{ alignSelf: 'center', marginBottom: hp('1%') }} category="h5">{i18n.t('Edit.Word')}</Text>
            <Layout style={styles.textDetail}>
              <Input
                status="info"
                style={{ width: wp('70%'), maxHeight: hp('12%') }}
                placeholder={i18n.t('Edit.Word')}
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="book-outline" size={22} />
                )}
                maxLength={12}
                value={Word}
                onChangeText={(text) => { setWord(text); }}
              />
            </Layout>
            <Layout style={styles.textDetail}>
              <Input
                status="info"
                style={{ width: wp('70%'), maxHeight: hp('12%') }}
                placeholder={i18n.t('Edit.Meaning')}
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="text-outline" size={22} />
                )}
                value={Meaning}
                onChangeText={(text) => { setMeaning(text); }}
              />
            </Layout>
            <Layout style={styles.addVocab}>
              <TouchableOpacity delayPressIn={0} onPress={() => addGlossary()}>
                <EvaIcon color={colors.primary} name="plus-circle-outline" size={40} />
              </TouchableOpacity>
            </Layout>
            <Layout style={styles.vocabCard}>
              {GlossaryList.map((item, index) => (
                <CreateVocab
                  item={item}
                  key={index}
                  index={index}
                  handleRemove={removeWord}
                />
              ))}
            </Layout>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => editAlert()}
              style={{
                alignSelf: 'center', backgroundColor: colors.primary, borderRadius: 10, padding: 15, margin: 10,
              }}
            >
              <Text>{i18n.t('Edit.Edit')}</Text>
            </TouchableOpacity>
          </ScrollView>
        )
        : []}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    height: hp('15%'),
    width: wp('30%'),
    borderRadius: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('2%'),
  },
  imageDetail: {
    padding: 10,
    borderRadius: 20,
  },
  textDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  vocabCard: {
    marginTop: 10,
  },
  addVocab: {
    alignItems: 'center',
  },
});

export default Create;
