import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
}
export const ExtraLargeButton = ({text, onPress}: Props) => {
  return (
    <View style={styles.location}>
      <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  location: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#2C71F6',
    width: 300,
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
