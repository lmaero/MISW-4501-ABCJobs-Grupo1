import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {
  text: string;
}

export const MainTitle = ({text}: Props) => {
  return <Text style={styles.main}>{text}</Text>;
};

const styles = StyleSheet.create({
  main: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 20,
  },
});
