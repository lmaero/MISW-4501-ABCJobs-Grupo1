import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker, {ListModeType} from 'react-native-dropdown-picker';
import {PickerValues} from '../interfaces/components/Picker';
import {appThemeStyles} from '../themes/appTheme';

interface Props {
  title: string;
  description: string;
  values: Array<PickerValues>;
  testID?: string;
  selected?: string;
  listMode?: ListModeType;
  placeholder?: string;
  useSmallMargin?: boolean;
  onChangeValue?: (value: string | null) => void;
}
export const WithDescriptionPicker = ({
  title,
  description,
  selected,
  values,
  testID = 'with-description-picker',
  listMode = 'FLATLIST',
  placeholder = '',
  useSmallMargin = false,
  onChangeValue,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selected || values[0].value);
  const [items, setItems] = useState(values);
  const {formItemcontainer, formItemMainMargin, formItemSmallMargin} =
    appThemeStyles;

  return (
    <View
      style={[
        formItemcontainer,
        useSmallMargin ? formItemSmallMargin : formItemMainMargin,
      ]}>
      <Text style={appThemeStyles.labelTitle}>{title}</Text>
      <Text style={appThemeStyles.labelDescription}>{description}</Text>
      <DropDownPicker
        testID={testID}
        style={styles.picker}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        listMode={listMode}
        onChangeValue={item => onChangeValue && onChangeValue(item)}
      />
      <Text style={styles.placeholder}>{placeholder}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    borderColor: 'rgba(28, 31, 30, 0.50)',
    borderWidth: 1,
    borderRadius: 10,
    height: 44,
  },
  placeholder: {
    color: '#89898A',
    position: 'absolute',
    right: 35,
    top: 53,
    zIndex: 9999,
  },
});
