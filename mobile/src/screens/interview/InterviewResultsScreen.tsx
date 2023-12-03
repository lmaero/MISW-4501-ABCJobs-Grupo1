import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/StackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {appThemeStyles} from '../../themes/appTheme';
import {LoadingScreen} from '../LoadingScreen';
import candidateApi from '../../api/Candidate';
import {Result, ResultsOutput} from '../../interfaces/api/Outputs';

interface Props
  extends StackScreenProps<RootStackParams, 'InterviewResultsScreen'> {}

export const InterviewResultsScreen = ({navigation, route}: Props) => {
  const {companyName, interviewId, wasSelected} = route.params;
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [results, setResults] = useState<Result[]>([]);
  const [avgScore, setAvgScore] = useState<Number>(0);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        const candidateResultsPromise = candidateApi.get<ResultsOutput>(
          `/interviews/results/${interviewId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        candidateResultsPromise
          .then(response => {
            if (response.data && response.data.results) {
              const totalScore =
                response.data.results.reduce(
                  (acc, result) => acc + result.score,
                  0,
                ) / response.data.results.length;
              setResults(response.data.results);
              setAvgScore(totalScore);
            }
            setIsLoaded(false);
          })
          .catch((error: AxiosError) => {
            setIsLoaded(false);
            console.log(error);
          });
      } else {
        setIsLoaded(false);
      }
    });
  }, [interviewId, wasSelected]);

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <View
      style={[appThemeStyles.mainContainer, appThemeStyles.formItemcontainer]}>
      <View style={styles.titleContainer}>
        <Icon
          name="arrow-left"
          size={25}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Results {companyName}</Text>
      </View>
      {results.map((result, index) => (
        <View key={index} style={styles.progressBarContainer}>
          <Text style={styles.progressBarLabel}>{result.test}</Text>
          <View style={styles.barContainer}>
            <ProgressBar
              styleAttr="Horizontal"
              indeterminate={false}
              progress={result.score / 100}
              color="#2C71F6"
              style={styles.bar}
            />
            <Text style={styles.barText}>{result.score}</Text>
          </View>
        </View>
      ))}
      <View style={styles.resultDetailContainer}>
        <Text style={styles.resultDetailLabel}>{`Score: ${avgScore}`}</Text>
        <Text style={[styles.resultDetailLabel, styles.textBold]}>
          Finished process
        </Text>
        <Text style={[styles.resultDetailLabel, styles.textBold]}>
          {wasSelected ? 'Selected' : 'Not selected'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 20,
  },
  progressBarContainer: {
    marginVertical: 5,
  },
  progressBarLabel: {
    color: 'black',
  },
  barContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bar: {
    transform: [{scaleX: 1.0}, {scaleY: 2.5}],
    width: 250,
  },
  barText: {
    color: 'black',
    marginLeft: 10,
    marginBottom: 5,
  },
  resultDetailContainer: {
    marginTop: 20,
  },
  resultDetailLabel: {
    color: 'black',
    fontSize: 16,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
