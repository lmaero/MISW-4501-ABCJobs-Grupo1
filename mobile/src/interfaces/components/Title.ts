import {StyleProp, ViewStyle} from 'react-native';

export interface TitleWithDescriptionProps {
  title: string;
  description: string;
  viewStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface TitleProps {
  title: string;
  isSmall?: boolean;
  viewStyle?: StyleProp<ViewStyle>;
}
