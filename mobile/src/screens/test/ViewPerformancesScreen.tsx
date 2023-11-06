import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {MediumButton} from '../../components/MediumButton';
import {WithDescriptionTitle} from '../../components/WithDescriptionTitle';
import {PerformanceItemList} from '../../components/PerformanceItemList';
import {PerformanceItem} from '../../interfaces/Performance';
import candidateApi from '../../api/Candidate';
import {CandidateTestsInput} from '../../interfaces/Candidate';
import {LoadingScreen} from '../LoadingScreen';
import _ from 'lodash';

export const ViewPerformancesScreen = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [performanceList, setPerformanceList] = useState<PerformanceItem[]>([]);

  useEffect(() => {
    async function getTestData() {
      const response = await candidateApi.get<CandidateTestsInput>('/tests', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response.data.results) {
        const newItems = response.data.results.map(result => {
          const newItem: PerformanceItem = {
            candidateName: result.candidate
              ? _.capitalize(result.candidate)
              : 'Candidate',
            candidateTypeTest: result.test_type,
            resultDescription: result.result,
            testTitle: result.test_name,
            resultPercentage: result.score,
          };
          return newItem;
        });
        setPerformanceList(newItems);
      }
    }
    getTestData();
    setIsLoaded(false);
  }, []);

  return isLoaded ? (
    <LoadingScreen />
  ) : (
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
