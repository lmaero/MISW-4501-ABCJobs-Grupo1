import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {WithDescriptionTitle} from './WithDescriptionTitle';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {PerformanceItem} from '../interfaces/Performance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import companyApi from '../api/Company';
import {ScheduleInterviewOutput} from '../interfaces/api/Outputs';
import {LoadingScreen} from '../screens/LoadingScreen';

export const PerformanceItemList = ({
  candidateId,
  candidateName,
  candidateTypeTest,
  testTitle,
  resultPercentage,
  resultDescription,
  canFinishTest,
  goToCreateResult,
}: PerformanceItem) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showDate, setShowDate] = useState(false);
  const [showSelectedDate, setShowSelectedDate] = useState(canFinishTest);
  const [date, setDate] = useState(new Date());

  const onDateChange = async (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    setShowDate(false);
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    if (event.type === 'set') {
      setIsLoaded(true);
      if (currentDate) {
        const wasCreated = await scheduleInterview(currentDate);
        wasCreated && setDate(currentDate);
        wasCreated && setShowSelectedDate(true);
      }
      setIsLoaded(false);
    }
  };
  const showDatePicker = () => {
    setShowDate(true);
  };

  const scheduleInterview = async (dateInput: Date) => {
    const token = await AsyncStorage.getItem('token');
    const response = await companyApi.post<ScheduleInterviewOutput>(
      '/interviews',
      {
        candidateId,
        date: dateInput.toISOString(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.status === 201;
  };

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <View style={style.performanceContainer}>
      <WithDescriptionTitle
        title={candidateName}
        description={candidateTypeTest}
        viewStyle={style.textContainer}
      />
      <WithDescriptionTitle
        title={testTitle}
        description={`${resultPercentage * 100}%${'\n'}${resultDescription}`}
        viewStyle={style.textContainer}
      />
      <View style={style.scheduleButtonContainer}>
        {!showSelectedDate && (
          <Icon
            name="calendar-days"
            size={25}
            color={'black'}
            onPress={showDatePicker}
          />
        )}
        {showDate && (
          <DateTimePicker value={date} mode="date" onChange={onDateChange} />
        )}
        {(canFinishTest || showSelectedDate) && (
          <Icon
            name="pen-to-square"
            size={25}
            color={'black'}
            onPress={goToCreateResult}
          />
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  performanceContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
  textContainer: {
    flex: 2,
    marginHorizontal: 20,
  },
  scheduleButtonContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 25,
    gap: 10,
  },
  scheduleSelectedLabel: {
    color: 'black',
    fontSize: 12,
    marginHorizontal: 5,
    width: 50,
  },
});
