import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ButtonProps} from '../interfaces/components/Button';

export const ExtraLargeButton = ({text, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.location}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  location: {
    width: '100%',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#2C71F6',
    height: 44,
    borderRadius: 10,
    borderColor: 'black',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
