import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useRecoilValue } from 'recoil';
import { Locate } from '../states/atom';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';
import i18n from '../lang/i18n';
import colors from '../constants/colors';

// screens
import MyVocab from '../screens/MyVocab';
import Edit from '../screens/Edit';

const MyVocabStack = (props) => {
  const LocateData = useRecoilValue(Locate);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator locate={LocateData} initialRouteName="MyVocab">
      <Stack.Screen
        name="MyVocab"
        component={MyVocab}
        options={{
          title: i18n.t('MyVocab.Title'),
          headerStyle: { backgroundColor: colors.primary },
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => props.navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          title: i18n.t('Edit.Title'),
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
    </Stack.Navigator>
  );
};

export default MyVocabStack;
