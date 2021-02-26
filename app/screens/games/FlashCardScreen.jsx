import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useRecoilValue } from 'recoil';
import colors from '../../constants/colors';
import CustomHeaderButton from '../../components/navigations/CustomHeaderButton';
import i18n from '../../lang/i18n';
import { Locate } from '../../states/atom';

const FlashCardScreen = (props) => {
  const { route } = props;
  const { VocabData } = route.params;

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
  }, []);

  const nextQuestion = () => {
    if (problem < questionList.length - 1) {
      setTimeout(() => {
        setProblem(problem + 1);
        setQuestionBox(questionList[problem + 1].en);
      }, 500);
      setQuestionBox(questionList[problem].th);
    } else {
      setQuestionBox(questionList[problem].th);
      setTimeout(() => { setScoreModal(true); }, 500);
    }
  };

  const questionList = VocabData;
  const [problem, setProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [ScoreModal, setScoreModal] = useState(false);
  const [questionBox, setQuestionBox] = useState(questionList[problem].en);

  return (
    <View style={styles.screen} locate={LocateData}>
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
      <TouchableOpacity
        style={[styles.questionField, styles.cardBox]}
        onPress={() => setQuestionBox(questionList[problem].th)}
      >
        <Text style={styles.questionText}>{questionBox}</Text>
      </TouchableOpacity>

      <View style={[styles.answerField]}>
        <TouchableOpacity
          style={styles.correctField}
          onPress={() => {
            setScore(score + 1);
            nextQuestion();
          }}
        >
          <Text style={styles.passText}>{i18n.t('FlashCard.Correct')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.incorrectField} onPress={() => nextQuestion()}>
          <Text style={styles.passText}>{i18n.t('FlashCard.SkipWrong')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  questionField: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: RFPercentage(5),
    fontWeight: 'bold',
  },
  answerField: {
    flex: 1,
  },
  cardBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: colors.primary,
    margin: 20,
    padding: 10,
    width: '80%',
    height: '20%',
  },
  correctField: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    backgroundColor: colors.correct,
  },
  incorrectField: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    backgroundColor: colors.incorrect,
  },
  passText: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: 'white',
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

export default FlashCardScreen;
