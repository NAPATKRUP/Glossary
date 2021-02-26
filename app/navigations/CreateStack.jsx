import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useRecoilValue } from 'recoil';
import { Locate } from '../states/atom';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';
import i18n from '../lang/i18n';
import colors from '../constants/colors';

// screens
import Create from '../screens/Create';

const CreateStack = (props) => {
  const LocateData = useRecoilValue(Locate);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator locate={LocateData} initialRouteName="Create">
      <Stack.Screen
        name="Create"
        component={Create}
        options={{
          title: i18n.t('CreateGlossary.Title'),
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
    </Stack.Navigator>
  );
};

export default CreateStack;
