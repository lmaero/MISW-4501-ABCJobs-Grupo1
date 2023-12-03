import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ButtonProps} from '../interfaces/components/Button';

export const MediumButton = ({
  text,
  onPress,
  secondary = false,
  buttonGroup = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[
        styles.location,
        buttonGroup ? styles.groupSize : styles.mainSize,
      ]}>
      <View
        style={[
          styles.button,
          secondary ? styles.buttonSecondary : styles.buttonPrimary,
        ]}>
        <Text
          style={[
            styles.text,
            secondary ? styles.textWhite : styles.textBlack,
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  location: {
    marginTop: 10,
  },
  mainSize: {
    width: '60%',
  },
  groupSize: {
    width: '40%',
  },
  button: {
    height: 44,
    borderRadius: 6,
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
    borderColor: 'rgba(0, 0, 0, 0.16)',
    paddingHorizontal: 10,
  },
  buttonSecondary: {
    backgroundColor: '#2C71F6',
    borderColor: 'black',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  textWhite: {
    color: 'white',
  },
  textBlack: {
    color: 'black',
  },
});
