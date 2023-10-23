import React from 'react';
import {TitleProps} from '../interfaces/components/Title';
import {StyleSheet, Text, View} from 'react-native';

export const SecondaryTitle = ({
  title,
  isSmall = false,
  viewStyle = {},
}: TitleProps) => {
  return (
    <View style={viewStyle}>
      <Text
        style={[
          styles.title,
          isSmall ? styles.isSmallFont : styles.isNormalFont,
        ]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter-Regular',
    fontWeight: '800',
    textAlign: 'left',
    color: '#000000',
  },
  isNormalFont: {
    fontSize: 20,
  },
  isSmallFont: {
    fontSize: 16,
  },
});
