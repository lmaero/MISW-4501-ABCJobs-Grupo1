import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {appThemeStyles} from '../themes/appTheme';
import {formatDateToDDMMYYYY} from '../utils/DateFormat';

interface Props {
  label: string;
  date: Date;
  onChangeDate?: (date: Date) => void;
}

export const SingleDatePicker = ({label, date, onChangeDate}: Props) => {
  const [showDate, setShowDate] = useState(false);
  const {inputForm} = appThemeStyles;

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    onChangeDate && onChangeDate(currentDate);
  };

  const showDatePicker = () => {
    setShowDate(true);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={showDatePicker}>
        <View style={styles.touchableViewDateInput}>
          <Text style={styles.dateText}>{label}</Text>
          <TextInput
            value={formatDateToDDMMYYYY(date)}
            style={[inputForm, styles.dateInput]}
            editable={false}
            pointerEvents="none"
          />
        </View>
      </TouchableWithoutFeedback>
      {showDate && (
        <DateTimePicker
          testID="dateTimePickerEnd"
          value={date}
          mode="date"
          onChange={onDateChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  touchableViewDateInput: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dateText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
  },
  dateInput: {
    width: '60%',
    color: 'black',
  },
});
