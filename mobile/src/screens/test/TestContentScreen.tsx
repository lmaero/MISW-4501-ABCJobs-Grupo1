import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {WithDescriptionTitle} from '../../components/WithDescriptionTitle';
import {appThemeStyles} from '../../themes/appTheme';
import {MediumButton} from '../../components/MediumButton';
import {QuestionField} from '../../components/QuestionField';
import {Answer} from '../../interfaces/Answers';

export const TestContentScreen = () => {
  const testName = 'ReactJS';
  const questions = useMemo(
    () => [
      {
        id: '1',
        question: 'Question 1',
        answersRadioButtons: [
          {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Answer 1',
            value: 'answer1',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '2',
            label: 'Answer 2',
            value: 'answer2',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '3',
            label: 'Answer 3',
            value: 'answer3',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '4',
            label: 'Answer 4',
            value: 'answer4',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '5',
            label: 'Answer 5',
            value: 'answer5',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
        ],
      },
      {
        id: '2',
        question: 'Question 2',
        answersRadioButtons: [
          {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Answer 1',
            value: 'answer1',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '2',
            label: 'Answer 2',
            value: 'answer2',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '3',
            label: 'Answer 3',
            value: 'answer3',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '4',
            label: 'Answer 4',
            value: 'answer4',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '5',
            label: 'Answer 5',
            value: 'answer5',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
        ],
      },
      {
        id: '3',
        question: 'Question 3',
        answersRadioButtons: [
          {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Answer 1',
            value: 'answer1',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '2',
            label: 'Answer 2',
            value: 'answer2',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '3',
            label: 'Answer 3',
            value: 'answer3',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '4',
            label: 'Answer 4',
            value: 'answer4',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
          {
            id: '5',
            label: 'Answer 5',
            value: 'answer5',
            color: '#2C71F6',
            borderColor: '#D8D8DA',
          },
        ],
      },
    ],
    [],
  );

  const [answer, setAnswer] = useState<Answer[]>([]);
  const onChangeValue = (value: Answer | null) => {
    if (value) {
      const {questionId: newQuestionId, answer: newAnswer} = value;
      const updatedAnswer = answer.some(a => a.questionId === newQuestionId)
        ? answer.filter(a => a.questionId !== newQuestionId)
        : answer;
      setAnswer([
        ...updatedAnswer,
        {questionId: newQuestionId, answer: newAnswer},
      ]);
    }
  };

  return (
    <View style={[appThemeStyles.mainContainer, style.mainContainerMargin]}>
      <WithDescriptionTitle
        title={`${testName} Test`}
        description="When you're finished, send your test!"
        viewStyle={appThemeStyles.mainTitleContainer}
      />
      <ScrollView style={style.questionsContainer}>
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
          onPress={() => console.log(answer)}
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
