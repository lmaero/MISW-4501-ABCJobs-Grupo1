import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {
  text?: string;
}

export const FormErrorMessage = ({text = 'Invalid value'}: Props) => {
  return <Text style={styles.msg}>{text}</Text>;
};

const styles = StyleSheet.create({
  msg: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginHorizontal: 50,
  },
});
