import React from 'react';
import {Text, View} from 'react-native';
import {appThemeStyles} from '../themes/appTheme';
import {TitleWithDescriptionProps} from '../interfaces/components/Title';

export const WithDescriptionTitle = ({
  title,
  description,
  viewStyle = {},
  testID = 'title-with-description-id',
}: TitleWithDescriptionProps) => {
  return (
    <View testID={testID} style={viewStyle}>
      <Text style={appThemeStyles.labelTitle}>{title}</Text>
      <Text style={appThemeStyles.labelDescription}>{description}</Text>
    </View>
  );
};
