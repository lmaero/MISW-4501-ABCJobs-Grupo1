import React from 'react';
import {Text, View} from 'react-native';
import {appThemeStyles} from '../themes/appTheme';
import {TitleWithDescriptionProps} from '../interfaces/components/Title';

export const WithDescriptionTitle = ({
  title,
  description,
  viewStyle = {},
}: TitleWithDescriptionProps) => {
  return (
    <View style={viewStyle}>
      <Text style={appThemeStyles.labelTitle}>{title}</Text>
      <Text style={appThemeStyles.labelDescription}>{description}</Text>
    </View>
  );
};
