import React from 'react';
import * as Facebook from 'expo-facebook';
import { StyleSheet } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { Icon } from '@ui-kitten/components';
import { useSetRecoilState } from 'recoil';
import {
  IsLogin, UserID, UserName, UserPicture,
} from '../../states/auth';
import i18n from '../../lang/i18n';

const FacebookLogin = () => {
  const AppID = '3402900533096481';

  const setIsLogin = useSetRecoilState(IsLogin);
  const setUserID = useSetRecoilState(UserID);
  const setUserName = useSetRecoilState(UserName);
  const setUserPicture = useSetRecoilState(UserPicture);

  const Login = async () => {
    try {
      await Facebook.initializeAsync({
        appId: AppID,
      });

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] });

      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`,
        );

        const { id, name, picture } = await response.json();

        // console.log('user info:', { id, name, picture });

        setUserID(id);
        setUserName(name);
        setUserPicture(picture.data.url);
        setIsLogin(true);
      } else {
        console.log(`type: ${type}`);
      }
    } catch ({ message }) {
      console.log(`error: ${message}`);
    }
  };

  return (
    <DrawerItem
      label={i18n.t('Navigation.SignIn')}
      onPress={() => Login()}
      icon={({ color }) => (
        <Icon
          style={styles.icon}
          fill={color}
          name="log-in"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 22,
    width: 22,
  },
});

export default FacebookLogin;
