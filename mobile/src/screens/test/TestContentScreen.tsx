import React, {useEffect, useState} from 'react';
import {AxiosError} from 'axios';
import _ from 'lodash';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {WithDescriptionTitle} from '../../components/WithDescriptionTitle';
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

export const TestContentScreen = () => {
  const [testID, setTestID] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [testName, setTestName] = useState('Test Name');
  const [questions, setQuestions] = useState<Question[]>([]);

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
    }
    getTestData();
    setIsLoaded(false);
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
    setIsLoaded(true);
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
      })
      .catch((error: AxiosError) => {
        setIsLoaded(false);
        error.code &&
          Alert.alert('Error', 'Error in the service, please try again later');
      });
  };

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <View style={[appThemeStyles.mainContainer, style.mainContainerMargin]}>
      <WithDescriptionTitle
        testID="test-content-title"
        title={`${testName} Test`}
        description="When you're finished, send your test!"
        viewStyle={appThemeStyles.mainTitleContainer}
      />
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
