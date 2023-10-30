import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {MediumButton} from '../../components/MediumButton';
import {WithDescriptionTitle} from '../../components/WithDescriptionTitle';
import {PerformanceItemList} from '../../components/PerformanceItemList';
import {PerformanceItem} from '../../interfaces/Performance';

export const ViewPerformancesScreen = () => {
  const performanceList: Array<PerformanceItem> = [
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
    {
      candidateName: 'John Doe',
      candidateTypeTest: 'Frontend',
      testTitle: 'Javascript',
      resultPercentage: 80,
      resultDescription: 'Passed',
    },
  ];
  return (
    <View>
      <View style={style.buttonGroupContainer}>
        <MediumButton
          text="Create new test"
          onPress={() => console.log('pressed')}
          buttonGroup={true}
          secondary={true}
        />
        <MediumButton
          text="Take test"
          onPress={() => console.log('pressed')}
          buttonGroup={true}
          secondary={true}
        />
      </View>
      <WithDescriptionTitle
        title="Lasts tests results"
        description="Sort By"
        viewStyle={style.titleContainer}
      />
      <ScrollView>
        {performanceList.map(
          (
            {
              candidateName,
              candidateTypeTest,
              testTitle,
              resultPercentage,
              resultDescription,
            },
            index,
          ) => (
            <PerformanceItemList
              key={index}
              candidateName={candidateName}
              candidateTypeTest={candidateTypeTest}
              testTitle={testTitle}
              resultPercentage={resultPercentage}
              resultDescription={resultDescription}
            />
          ),
        )}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  buttonGroupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 15,
    marginVertical: 50,
  },
  titleContainer: {
    marginVertical: 40,
    marginHorizontal: 20,
  },
});
