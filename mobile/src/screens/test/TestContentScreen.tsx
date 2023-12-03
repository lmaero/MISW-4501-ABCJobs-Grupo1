import React, {useEffect, useState} from 'react';
import {AxiosError} from 'axios';
import _ from 'lodash';
import {Alert, ScrollView, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {appThemeStyles} from '../../themes/appTheme';
import {MediumButton} from '../../components/MediumButton';
import {QuestionField} from '../../components/QuestionField';
import {Answer} from '../../interfaces/Answers';
import companyApi from '../../api/Company';
import {LoadingScreen} from '../LoadingScreen';
import {CompanyTestsInput} from '../../interfaces/api/Inputs';
import {Question} from '../../interfaces/Question';
import {formatQuestions} from '../../utils/QuestionFormat';
import {TestPerformed} from '../../interfaces/Performance';
import candidateApi from '../../api/Candidate';
import {RootStackParams} from '../../navigator/StackNavigator';

interface Props
  extends StackScreenProps<RootStackParams, 'TestContentScreen'> {}

export const TestContentScreen = ({navigation}: Props) => {
  const [testID, setTestID] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [testName, setTestName] = useState('Test Name');
  const [questions, setQuestions] = useState<Question[]>([]);

  const homeNavigate = () => {
    const isCandidatePromise = AsyncStorage.getItem('isCandidate');
    const emailPromise = AsyncStorage.getItem('email');

    Promise.all([isCandidatePromise, emailPromise]).then(values => {
      const isCandidate = values[0] === 'true';
      const email = values[1];
      isCandidate
        ? email &&
          navigation.navigate('CandidateInfoDetail', {
            candidateEmail: email,
          })
        : email &&
          navigation.navigate('CompanyInfoDetail', {
            companyEmail: email,
          });
    });
  };

  useEffect(() => {
    async function getTestData() {
      const response = await companyApi.get<CompanyTestsInput>('/tests', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      setTestID(
        response.data.tests[0].test_id &&
          Number(response.data.tests[0].test_id),
      );
      setTestName(
        response.data.tests[0].name &&
          _.capitalize(response.data.tests[0].name),
      );
      setQuestions(
        response.data.tests[0].questions &&
          formatQuestions(response.data.tests[0].questions),
      );
      setIsLoaded(false);
    }
    getTestData();
  }, []);

  const onChangeValue = (value: Answer | null) => {
    if (value) {
      const {questionId: newQuestionId, answer: newAnswer} = value;
      const updatedAnswer = answers.some(a => a.questionId === newQuestionId)
        ? answers.filter(a => a.questionId !== newQuestionId)
        : answers;
      setAnswers([
        ...updatedAnswer,
        {questionId: newQuestionId, answer: newAnswer},
      ]);
    }
  };

  const onSubmit = () => {
    AsyncStorage.getItem('token').then(token => {
      setIsLoaded(true);
      if (token) {
        const testPerformed: TestPerformed = {
          test_id: testID,
          answers: [],
        };

        testPerformed.answers = answers.map(answer => [
          String(answer.questionId),
          answer.answer,
        ]);

        const performTestPromise = candidateApi.post(
          '/test',
          JSON.stringify(testPerformed),
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        performTestPromise
          .then(response => {
            setIsLoaded(false);
            response.data && response.data.message;
            Alert.alert('Success', response.data.message, [
              {
                text: 'Ok',
              },
            ]);
            navigation.goBack();
          })
          .catch((error: AxiosError) => {
            setIsLoaded(false);
            error.code &&
              Alert.alert(
                'Error',
                'Error in the service, please try again later',
              );
          });
      } else {
        setIsLoaded(false);
        Alert.alert('Error', 'Error in the service, please try again later');
      }
    });
  };

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <View style={[appThemeStyles.mainContainer, style.mainContainerMargin]}>
      <View style={style.titleContainer}>
        <Icon
          name="arrow-left"
          size={25}
          color={'black'}
          onPress={homeNavigate}
        />
        <Text style={style.title}>{testName} Test</Text>
      </View>
      <ScrollView
        testID="test-scroll-view-content"
        style={style.questionsContainer}>
        {questions.map(question => (
          <QuestionField
            key={question.id}
            id={question.id}
            question={question.question}
            answersRadioButtons={question.answersRadioButtons}
            onChangeValue={onChangeValue}
          />
        ))}
      </ScrollView>
      <View style={style.buttonGroupContainer}>
        <MediumButton
          text="Send"
          onPress={onSubmit}
          buttonGroup={true}
          secondary={true}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
  mainContainerMargin: {
    marginBottom: 50,
  },
  questionsContainer: {
    paddingVertical: 5,
  },
  buttonGroupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
    marginVertical: 20,
  },
});
