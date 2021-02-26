import {
  Layout, Input, Text, Toggle, Spinner,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import {
  StyleSheet, TouchableOpacity, Image, Alert, ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import Constants from 'expo-constants';
import { useRecoilValue, useRecoilState } from 'recoil';
import IconImage from '../assets/profile.png';
import colors from '../constants/colors';
import EvaIcon from '../components/EvaIcon';
import CreateVocab from '../components/Create/CreateVocab';
import { Locate, CreateRefresh } from '../states/atom';
import { UserID, UserName } from '../states/auth';
import i18n from '../lang/i18n';

const Create = (props) => {
  const [GlossaryName, setGlossaryName] = useState('');
  const [Description, setDescription] = useState('');
  const [Word, setWord] = useState('');
  const [Meaning, setMeaning] = useState('');
  const [GlossaryList, setGlossaryList] = useState([]);
  const [Private, setPrivate] = useState(false);
  const [Loading, setLoading] = useState(false);

  const UserIDData = useRecoilValue(UserID);
  const UserNameData = useRecoilValue(UserName);
  const LocateData = useRecoilValue(Locate);
  const [CreateRefreshData, setCreateRefreshData] = useRecoilState(CreateRefresh);

  const onCheckedChange = (isChecked) => {
    setPrivate(isChecked);
  };

  const addGlossary = () => {
    if (Word !== '' && Meaning !== '') {
      const WordData = { en: Word.trim(), th: Meaning.trim() };
      const GlossaryData = GlossaryList;
      GlossaryData.push(WordData);
      setGlossaryList(GlossaryData);
      setWord('');
      setMeaning('');
    }
  };

  const createGlossary = () => {
    if (GlossaryName !== '' && Description !== '' && GlossaryList.length >= 5) {
      setLoading(true);
      axios.post(`${Constants.manifest.extra.URL_API}/api/create/glossary`, {
        name: GlossaryName.trim(),
        description: Description.trim(),
        type: Private === true ? 'private' : 'unofficial',
        owner: UserNameData,
        owner_id: UserIDData,
        glossary: GlossaryList,
      }).then(() => {
        setGlossaryName('');
        setDescription('');
        setWord('');
        setMeaning('');
        setGlossaryList([]);
        props.navigation.navigate('MyVocab');
        setCreateRefreshData(!CreateRefreshData);
        setLoading(false);
      });
    } else if (GlossaryList.length < 5) {
      Alert.alert(
        i18n.t('CreateGlossary.Alert'),
        i18n.t('CreateGlossary.Below'),
        [
          { text: i18n.t('CreateGlossary.OK') },
        ],
      );
    } else {
      Alert.alert(
        i18n.t('CreateGlossary.Alert'),
        i18n.t('CreateGlossary.Complete'),
        [
          { text: i18n.t('CreateGlossary.OK') },
        ],
      );
    }
  };

  const createAlert = () => {
    Alert.alert(
      i18n.t('CreateGlossary.CreateAlert'),
      i18n.t('CreateGlossary.CreateMsg'),
      [
        {
          text: i18n.t('CreateGlossary.Cancel'),
          style: 'cancel',
        },
        { text: i18n.t('CreateGlossary.Create'), onPress: () => createGlossary() },
      ],
      { cancelable: false },
    );
  };

  const removeWord = (index) => {
    Alert.alert(
      i18n.t('CreateGlossary.DeleteTitle'),
      i18n.t('CreateGlossary.DeleteMsg'),
      [
        {
          text: i18n.t('CreateGlossary.Cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('CreateGlossary.Delete'),
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
            <Layout style={{ marginBottom: 20 }}>
              <Toggle checked={Private} onChange={onCheckedChange} style={{ margin: 5 }} status="info">
                {i18n.t('CreateGlossary.Private')}
              </Toggle>
            </Layout>
            <Layout style={styles.textDetail}>
              <Input
                status="info"
                style={{ width: wp('70%') }}
                placeholder={i18n.t('CreateGlossary.Name')}
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="book-open-outline" size={22} />
                )}
                value={GlossaryName}
                onChangeText={(text) => { setGlossaryName(text); }}
              />
            </Layout>
            <Layout style={styles.textDetail}>
              <Input
                multiline
                maxLength={200}
                status="info"
                style={{ width: wp('70%'), maxHeight: hp('12%') }}
                placeholder={i18n.t('CreateGlossary.Description')}
                accessoryRight={() => (
                  <EvaIcon color={colors.primary} name="file-text-outline" size={22} />
                )}
                value={Description}
                onChangeText={(text) => { setDescription(text); }}
              />
            </Layout>
            <Text style={{ alignSelf: 'center', marginBottom: hp('1%') }} category="h5">{i18n.t('CreateGlossary.Word')}</Text>
            <Layout style={styles.textDetail}>
              <Input
                status="info"
                style={{ width: wp('70%'), maxHeight: hp('12%') }}
                placeholder={i18n.t('CreateGlossary.Word')}
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
                placeholder={i18n.t('CreateGlossary.Meaning')}
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
              onPress={() => createAlert()}
              style={{
                alignSelf: 'center', backgroundColor: colors.primary, borderRadius: 10, padding: 15, margin: 10,
              }}
            >
              <Text>{i18n.t('CreateGlossary.Create')}</Text>
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
