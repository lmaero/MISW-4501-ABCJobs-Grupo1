import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {appThemeStyles} from '../themes/appTheme';
import {TextInputWithTitleProps} from '../interfaces/components/Input';

export const SingleInput = ({
  title,
  placeholder,
  value = '',
  autoCorrect = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  isPassword = false,
  onChangeText,
}: TextInputWithTitleProps) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={appThemeStyles.formItemcontainer}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={showPassword}
        onChangeText={onChangeText}
      />
      {isPassword && (
        <Icon
          name={showPassword ? 'eye' : 'eye-slash'}
          size={20}
          color="rgba(28, 31, 30, 0.50)"
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(28, 31, 30, 0.50)',
    borderRadius: 10,
    height: 44,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 40,
  },
});
