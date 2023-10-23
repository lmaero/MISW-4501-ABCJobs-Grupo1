import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {appThemeStyles} from '../themes/appTheme';
import {TextInputWithoutTitleProps} from '../interfaces/components/Input';
import {TitleWithDescriptionProps} from '../interfaces/components/Title';

interface Props {
  titleProps: TitleWithDescriptionProps;
  textInputProps: TextInputWithoutTitleProps;
  testID?: string;
  smallSize?: boolean;
  useSmallMargin?: boolean;
}

export const WithDescriptionInput = ({
  titleProps,
  textInputProps,
  testID = 'with-description-input',
  smallSize = false,
  useSmallMargin = false,
}: Props) => {
  const {
    formItemcontainer,
    formItemFullSize,
    formItemSmallSize,
    formItemMainMargin,
    formItemSmallMargin,
    inputForm,
  } = appThemeStyles;
  return (
    <View
      style={[
        formItemcontainer,
        smallSize ? formItemSmallSize : formItemFullSize,
        useSmallMargin ? formItemSmallMargin : formItemMainMargin,
      ]}>
      <Text style={appThemeStyles.labelTitle}>{titleProps.title}</Text>
      {titleProps.description !== '' && (
        <Text style={appThemeStyles.labelDescription}>
          {titleProps.description}
        </Text>
      )}
      <TextInput
        testID={testID}
        style={inputForm}
        value={textInputProps.value}
        placeholder={textInputProps.placeholder}
        autoCorrect={textInputProps.autoCorrect}
        autoCapitalize={textInputProps.autoCapitalize}
        keyboardType={textInputProps.keyboardType}
        onChangeText={textInputProps.onChangeText}
      />
    </View>
  );
};
