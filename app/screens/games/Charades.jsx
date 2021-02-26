import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal,
} from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useRecoilValue } from 'recoil';
import CustomHeaderButton from '../../components/navigations/CustomHeaderButton';
import EvaIcon from '../../components/EvaIcon';
import colors from '../../constants/colors';
import i18n from '../../lang/i18n';
import { Locate } from '../../states/atom';

// screen status
// [1] waiting, [2] playing, [3] finish

const Charades = (props) => {
  const { route } = props;
  const { VocabData } = route.params;

  const LocateData = useRecoilValue(Locate);

  const [status, setStatus] = useState('waiting');
  const [displayText, setDisplayText] = useState(i18n.t('Charades.Guide'));
  const [displayTextSmall, setDisplayTextSmall] = useState('');
  const [check, setCheck] = useState(null);

  const [word, setWord] = useState(VocabData);

  const [score, setScore] = useState(0);
  const [ScoreModal, setScoreModal] = useState(true);
  const [checkFinish, setCheckFinish] = useState([false]);

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
  }, []);

  const skipWord = () => {
    try {
      setWord(word.slice(1));
      setDisplayText(word[0].en);
      setDisplayTextSmall(word[0].th);
    } catch (error) {
      setStatus('finish');
    }
  };

  const gameStart = (event) => {
    const getPosition = event.accelerationIncludingGravity;
    if (checkFinish[0]) { DeviceMotion.removeAllListeners(); } else {
      if (getPosition.z >= 6 && check !== 'pass') { setCheck('pass'); setDisplayText(i18n.t('Charades.Correct')); setDisplayTextSmall(''); setScore(score + 1); }
      if (getPosition.z <= -6 && check !== 'skip') { setCheck('skip'); setDisplayText(i18n.t('Charades.Skip')); setDisplayTextSmall(''); }
      if (getPosition.z > -6 && getPosition.z < 6 && check !== 'reset') { setCheck('reset'); skipWord(); }
    }

    // console.log(`z: ${getPosition.z}, ${check}, ${displayText}, ${status}, State: ${checkFinish[0]}`);
  };

  const checkDeviceRotate = (event) => {
    if (checkFinish[0]) {
      DeviceMotion.removeAllListeners();
    } else if (event.orientation === -90 && !checkFinish[0]) {
      DeviceMotion.removeAllListeners();
      DeviceMotion.addListener(gameStart);
      DeviceMotion.setUpdateInterval(100);
    }
  };

  const addDeviceMotion = async () => {
    const isAvailable = await DeviceMotion.isAvailableAsync();
    if (isAvailable) {
      DeviceMotion.addListener(checkDeviceRotate);
      DeviceMotion.setUpdateInterval(100);
    }
  };

  const screenColor = (e) => {
    if (e === 'pass') return colors.correct;
    if (e === 'skip') return colors.incorrect;
    return 'white';
  };

  const Content = () => {
    if (status === 'waiting') {
      return (
        <TouchableOpacity style={styles.button} onPress={() => setStatus('playing')}>
          <Text style={{ fontSize: RFPercentage(3) }}>
            <EvaIcon
              color="black"
              name="play-circle-outline"
              size={RFPercentage(3)}
            />
            {' '}
            เริ่มเกม
          </Text>
        </TouchableOpacity>
      );
    }
    if (status === 'playing') {
      addDeviceMotion();
      return (
        <View style={{ alignItems: 'center', ...styles.rotateText }}>
          <Text style={styles.textBig}>{displayText}</Text>
          <Text style={styles.textSmall}>{displayTextSmall}</Text>
        </View>
      );
    }
    if (status === 'finish') {
      checkFinish[0] = true;
      return (
        <Modal
          animationType="slide"
          transparent
          visible={ScoreModal}
        >
          <View style={styles.scoreModal}>
            <Text style={styles.mTitleText}>{i18n.t('GameModal.Congrat')}</Text>
            <Text style={styles.mSubTitleText}>{i18n.t('GameModal.Score')}</Text>
            <Text style={styles.mScoreText}>
              {score}
              /
              {VocabData.length}
            </Text>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => props.navigation.goBack()}
            >
              <Text style={styles.homeText}>{i18n.t('GameModal.End')}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
    return null;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: screenColor(check),
      justifyContent: 'center',
      alignItems: 'center',
    },
    rotateText: {
      transform: [{ rotate: '90deg' }],
    },
    textBig: {
      fontSize: RFPercentage(7),
    },
    textSmall: {
      fontSize: RFPercentage(4),
    },
    button: {
      backgroundColor: colors.secondary,
      padding: 10,
      borderRadius: 5,
    },

    scoreModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    mTitleText: {
      fontSize: RFPercentage(10),
      fontWeight: 'bold',
      marginBottom: 25,
    },
    mSubTitleText: {
      fontSize: RFPercentage(3),
      fontWeight: 'bold',
    },
    mScoreText: {
      fontSize: RFPercentage(12),
      fontWeight: 'bold',
    },
    homeButton: {
      borderRadius: 10,
      marginTop: 20,
      padding: 10,
      backgroundColor: colors.primary,
    },
    homeText: {
      fontWeight: 'bold',
      fontSize: RFPercentage(3),
      color: 'white',
    },
  });

  return (
    <View style={styles.container} locate={LocateData}>
      <Content />
    </View>
  );
};

export default Charades;
