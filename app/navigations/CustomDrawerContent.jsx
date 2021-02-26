import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Avatar, Text, Icon } from '@ui-kitten/components';
import { useRecoilValue } from 'recoil';
import Constants from 'expo-constants';
import axios from 'axios';
import {
  IsLogin, UserName, UserPicture, UserID,
} from '../states/auth';
import { Locate } from '../states/atom';
import ProfileImage from '../assets/profile.png';
import LoginButton from '../components/navigations/LoginButton';
import LogoutButton from '../components/navigations/LogoutButton';
import i18n from '../lang/i18n';
import colors from '../constants/colors';
import EvaIcon from '../components/EvaIcon';

const CustomDrawerContent = (props) => {
  const { SwitchLanguage } = props;

  const IsLoginData = useRecoilValue(IsLogin);
  const UserNameData = useRecoilValue(UserName);
  const UserPictureData = useRecoilValue(UserPicture);
  const LocateData = useRecoilValue(Locate);
  const UserIDData = useRecoilValue(UserID);

  const [TotalGlossary, SetTotalGlossary] = useState(0);
  const [TotalLike, SetTotalLike] = useState(0);

  useEffect(() => {
    axios.get(`${Constants.manifest.extra.URL_API}/api/data/glossary?id=${UserIDData}`).then((res) => {
      SetTotalGlossary(res.data.response.length);
      let like = 0;
      res.data.response.forEach((item) => like += item.like.length);
      SetTotalLike(like);
    });
  }, [IsLoginData]);

  return (
    <View style={{ flex: 1 }} locate={LocateData}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              <Avatar
                style={styles.avatar}
                source={UserPictureData ? { uri: UserPictureData } : ProfileImage}
              />
            </View>
            <View style={styles.name}>
              <Text category="h6" numberOfLines={1}>{UserNameData || i18n.t('Navigation.Name')}</Text>
            </View>
            {/* Show when user login. */}
            {IsLoginData
              && (
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={styles.total}>
                  <Text category="h6" style={{ marginBottom: 5 }}>
                    <EvaIcon color="#ff7b14" name="book" size={15} />
                    {' '}
                    {i18n.t('Navigation.Total')}
                  </Text>
                  <Text category="s1">{TotalGlossary}</Text>
                </View>
                <View style={styles.like}>
                  <Text category="h6" style={{ marginBottom: 5 }}>
                    <EvaIcon color="#ff3d71" name="heart" size={15} />
                    {' '}
                    {i18n.t('Navigation.Like')}
                  </Text>
                  <Text category="s1">{TotalLike}</Text>
                </View>
              </View>
              )}
          </View>
          <View style={styles.drawerSection}>
            <View style={{}}>
              <DrawerItemList {...props} />
              <View style={styles.bottomDrawerSection}>
                <DrawerItem
                  label={i18n.t('Navigation.SwitchLanguage')}
                  onPress={() => SwitchLanguage()}
                  icon={({ color }) => (
                    <Icon
                      style={styles.icon}
                      fill={color}
                      name="globe-2"
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        {IsLoginData ? <LogoutButton /> : <LoginButton />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primary,
  },
  name: {
    marginTop: 10,
    fontWeight: '400',
  },
  total: {
    lineHeight: 14,
    padding: 10,
    alignItems: 'center',
    marginRight: 30,
  },
  like: {
    lineHeight: 14,
    padding: 10,
    alignItems: 'center',
    marginLeft: 30,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 5,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    height: 128,
    width: 128,
  },
  icon: {
    height: 22,
    width: 22,
  },
});

export default CustomDrawerContent;
