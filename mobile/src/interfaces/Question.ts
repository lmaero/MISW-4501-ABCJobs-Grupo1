export interface Question {
  id: string;
  question: string;
  answersRadioButtons: AnswersRadioButton[];
}

export interface AnswersRadioButton {
  id: string;
  label: string;
  value: string;
  color: string;
  borderColor: string;
}
