import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Locate, Search } from '../states/atom';
import CustomHeaderButton from '../components/navigations/CustomHeaderButton';
import i18n from '../lang/i18n';
import colors from '../constants/colors';

// screens
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Game from '../screens/Game';
import Practice from '../screens/Practice';

// games
import Choice from '../screens/games/ChoiceScreen';
import FlashCard from '../screens/games/FlashCardScreen';
import FillIn from '../screens/games/FillInScreen';
import Charades from '../screens/games/Charades';

const MainStack = (props) => {
  const LocateData = useRecoilValue(Locate);
  const [SearchData, setSearchData] = useRecoilState(Search);

  const Stack = createStackNavigator();

  const handleSearch = () => {
    setSearchData(!SearchData);
  };

  return (
    <Stack.Navigator locate={LocateData} initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: i18n.t('Home.Title'),
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
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Search"
                iconName="ios-search"
                onPress={() => handleSearch()}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: i18n.t('Detail.Title'),
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
      <Stack.Screen
        name="Game"
        component={Game}
        options={{
          title: i18n.t('Game.Title'),
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
      <Stack.Screen
        name="Practice"
        component={Practice}
        options={{
          title: i18n.t('Practice.Title'),
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
      <Stack.Screen
        name="Choice"
        component={Choice}
        options={{
          title: i18n.t('Game.Choice'),
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
      <Stack.Screen
        name="FlashCard"
        component={FlashCard}
        options={{
          title: i18n.t('Game.FlashCard'),
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
      <Stack.Screen
        name="FillIn"
        component={FillIn}
        options={{
          title: i18n.t('Game.FillIn'),
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
      <Stack.Screen
        name="Charades"
        component={Charades}
        options={{
          title: i18n.t('Game.Charades'),
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
