import _ from 'lodash';
import {AnswersRadioButton, Question} from '../interfaces/Question';
import {QuestionInput} from '../interfaces/api/Inputs';

const formatAnswers = (question: QuestionInput): AnswersRadioButton[] => {
  const {rightAnswer, wrongOptions} = question;

  const answers = [...wrongOptions, rightAnswer];
  const shuffledAnswers = _.shuffle(answers);

  return shuffledAnswers.map((answer, index) => ({
    id: `${index + 1}`,
    label: _.capitalize(answer),
    value: answer,
    color: '#2C71F6',
    borderColor: '#D8D8DA',
  }));
};

export const formatQuestions = (questions: QuestionInput[]): Question[] => {
  return questions.map(question => ({
    id: question.question_id,
    question: _.capitalize(question.question),
    answersRadioButtons: formatAnswers(question),
  }));
};
