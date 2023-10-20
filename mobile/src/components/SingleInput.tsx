import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface Props {
  title: string;
  placeholder: string;
  value?: string;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
}

export const SingleInput = ({
  title,
  placeholder,
  value = '',
  autoCorrect = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  isPassword = false,
  onChangeText,
}: Props) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={styles.container}>
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
  container: {
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
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
    width: 300,
    height: 44,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 40,
  },
});
