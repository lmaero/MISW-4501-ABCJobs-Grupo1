import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {WithDescriptionTitle} from './WithDescriptionTitle';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {Answer} from '../interfaces/Answers';
import {AnswersRadioButton} from '../interfaces/Question';

interface Props {
  id: string;
  question: string;
  answersRadioButtons: AnswersRadioButton[];
  description?: string;
  onChangeValue?: (value: Answer | null) => void;
}

export const QuestionField = ({
  id,
  question,
  answersRadioButtons,
  onChangeValue,
  description = 'Select the appropriate definition',
}: Props) => {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  return (
    <View key={id}>
      <WithDescriptionTitle
        title={question}
        description={description}
        viewStyle={style.titleQuestionContainer}
      />
      <RadioGroup
        radioButtons={answersRadioButtons}
        onPress={(newId: string) => {
          setSelectedId(newId);
          onChangeValue &&
            onChangeValue({
              questionId: id,
              answer:
                answersRadioButtons.find(a => a.id === newId)?.value || '',
            });
        }}
        selectedId={selectedId}
        containerStyle={style.radioGroupContainer}
      />
    </View>
  );
};

const style = StyleSheet.create({
  titleQuestionContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  radioGroupContainer: {
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
});
