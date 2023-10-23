import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {
  text?: string;
  noMargin?: boolean;
}

export const FormErrorMessage = ({
  text = 'Invalid value',
  noMargin = false,
}: Props) => {
  return <Text style={[styles.msg, !noMargin && styles.margin]}>{text}</Text>;
};

const styles = StyleSheet.create({
  msg: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  margin: {
    marginHorizontal: 50,
  },
});
