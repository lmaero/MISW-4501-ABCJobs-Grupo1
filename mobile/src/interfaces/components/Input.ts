import {KeyboardTypeOptions} from 'react-native';

export interface TextInputWithTitleProps {
  title: string;
  placeholder: string;
  value?: string;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
}

export interface TextInputWithoutTitleProps {
  placeholder: string;
  value?: string;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
}
