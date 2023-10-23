export interface ButtonProps {
  text: string;
  onPress: () => void;
  secondary?: boolean;
  buttonGroup?: boolean;
}
