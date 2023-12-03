import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PerformanceItemList} from '../../components/PerformanceItemList';
import {PerformanceItem} from '../../interfaces/Performance';
import candidateApi from '../../api/Candidate';
import {CandidateTestsInput} from '../../interfaces/Candidate';
import {LoadingScreen} from '../LoadingScreen';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/StackNavigator';
import {Interview, InterviewsOutput} from '../../interfaces/api/Outputs';
import companyApi from '../../api/Company';

interface Props
  extends StackScreenProps<RootStackParams, 'ViewPerformancesScreen'> {}

export const ViewPerformancesScreen = ({navigation}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [performanceList, setPerformanceList] = useState<PerformanceItem[]>([]);

  const homeNavigate = () => {
    const isCandidatePromise = AsyncStorage.getItem('isCandidate');
    const emailPromise = AsyncStorage.getItem('email');

    Promise.all([isCandidatePromise, emailPromise]).then(values => {
      const isCandidate = values[0] === 'true';
      const email = values[1];
      isCandidate
        ? email &&
          navigation.navigate('CandidateInfoDetail', {
            candidateEmail: email,
          })
        : email &&
          navigation.navigate('CompanyInfoDetail', {
            companyEmail: email,
          });
    });
  };

  useEffect(() => {
    async function getTestData() {
      const token = await AsyncStorage.getItem('token');
      let interviewList: Interview[] = [];
      try {
        const response = await companyApi.get<InterviewsOutput>('/interviews', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        interviewList = response.data.interviews;
      } catch (error: any) {
        interviewList = [];
      }
      const responseTests = await candidateApi.get<CandidateTestsInput>(
        '/tests',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      if (responseTests.data.results) {
        const newItems = responseTests.data.results.map(result => {
          const interview = interviewList.find(
            ivw => ivw.candidateid === result.candidateid,
          );
          const newItem: PerformanceItem = {
            candidateId: result.candidateid,
            interviewId: interview ? interview.interview_id : 0,
            companyId: interview ? interview.company_id : 0,
            companyName: interview ? interview.company_name : 'Company Name',
            candidateName: result.candidate
              ? _.capitalize(result.candidate)
              : 'Candidate',
            candidateTypeTest: result.test_type,
            resultDescription: result.result,
            testTitle: result.test_name,
            resultPercentage: result.score,
            canFinishTest: Boolean(interview),
          };
          return newItem;
        });
        setPerformanceList(newItems);
      }
      setIsLoaded(false);
    }
    getTestData();
  }, []);

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <View>
      <View style={style.titleContainer}>
        <Icon
          name="arrow-left"
          size={25}
          color={'black'}
          onPress={homeNavigate}
        />
        <Text style={style.title}>Last test results</Text>
      </View>
      <ScrollView>
        {performanceList.map(
          (
            {
              candidateId,
              companyId,
              interviewId,
              companyName,
              candidateName,
              candidateTypeTest,
              testTitle,
              resultPercentage,
              resultDescription,
              canFinishTest,
            },
            index,
          ) => (
            <PerformanceItemList
              key={index}
              candidateId={candidateId}
              companyId={companyId}
              interviewId={interviewId}
              companyName={companyName}
              candidateName={candidateName}
              candidateTypeTest={candidateTypeTest}
              testTitle={testTitle}
              resultPercentage={resultPercentage}
              resultDescription={resultDescription}
              canFinishTest={canFinishTest}
              goToCreateResult={() =>
                navigation.navigate('CandidateSelectionScreen', {
                  candidateId,
                  companyId,
                  interviewId,
                  companyName,
                })
              }
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
});
