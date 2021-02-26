import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Locate } from '../states/atom';
import { IsLogin } from '../states/auth';
import CustomDrawerContent from './CustomDrawerContent';
import MainStack from './MainStack';
import CustomEvaIcon from '../components/navigations/CustomEvaIcon';
import i18n from '../lang/i18n';
import MyVocabStack from './MyVocabStack';
import NoPermissionStack from './NoPermissionStack';
import CreateStack from './CreateStack';

const Navigator = () => {
  const Drawer = createDrawerNavigator();

  const [LocateData, setLocateData] = useRecoilState(Locate);
  const IsLoginData = useRecoilValue(IsLogin);

  const SwitchLanguage = () => {
    const locateCode = LocateData.split('-')[0];
    if (locateCode === 'th') {
      setLocateData('en-US');
      i18n.locale = 'en-US';
    } else {
      setLocateData('th-TH');
      i18n.locale = 'th-TH';
    }
  };

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} SwitchLanguage={SwitchLanguage} />}>
      <Drawer.Screen name="Home" component={MainStack} options={{ title: i18n.t('Navigation.Home'), drawerIcon: (props) => (<CustomEvaIcon data={{ ...props, name: 'home' }} />) }} />
      <Drawer.Screen name="MyVocab" component={IsLoginData ? MyVocabStack : NoPermissionStack} options={{ title: i18n.t('Navigation.MyGlossary'), drawerIcon: (props) => (<CustomEvaIcon data={{ ...props, name: 'book' }} />) }} />
      <Drawer.Screen name="CreateNewGlossary" component={IsLoginData ? CreateStack : NoPermissionStack} options={{ title: i18n.t('Navigation.CreateNewGlossary'), drawerIcon: (props) => (<CustomEvaIcon data={{ ...props, name: 'plus-square' }} />) }} />
    </Drawer.Navigator>
  );
};

export default Navigator;
