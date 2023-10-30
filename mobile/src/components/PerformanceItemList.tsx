import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WithDescriptionTitle} from './WithDescriptionTitle';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {PerformanceItem} from '../interfaces/Performance';

export const PerformanceItemList = ({
  candidateName,
  candidateTypeTest,
  testTitle,
  resultPercentage,
  resultDescription,
}: PerformanceItem) => {
  return (
    <View style={style.performanceContainer}>
      <WithDescriptionTitle
        title={candidateName}
        description={candidateTypeTest}
        viewStyle={style.textContainer}
      />
      <WithDescriptionTitle
        title={testTitle}
        description={`${resultPercentage}%${'\n'}${resultDescription}`}
        viewStyle={style.textContainer}
      />
      <View style={style.scheduleButtonContainer}>
        <Icon name="calendar-days" size={30} />
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
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 40,
  },
});
