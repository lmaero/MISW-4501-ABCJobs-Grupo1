import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/StackNavigator';
import {appThemeStyles} from '../../themes/appTheme';
import {WithDescriptionTitle} from '../../components/WithDescriptionTitle';
import {Navbar} from '../../components/Navbar';
import {LoadingScreen} from '../LoadingScreen';
import candidateApi from '../../api/Candidate';
import {Interview, InterviewsOutput} from '../../interfaces/api/Outputs';

interface Props
  extends StackScreenProps<RootStackParams, 'InterviewListScreen'> {}

export const InterviewListScreen = ({navigation, route}: Props) => {
  const {email, isCandidate} = route.params;
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  const homeNavigate = () => {
    isCandidate
      ? navigation.navigate('CandidateInfoDetail', {
          candidateEmail: email,
        })
      : navigation.navigate('CompanyInfoDetail', {
          companyEmail: email,
        });
  };

  const logoutNavigate = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('email');
    AsyncStorage.removeItem('isCandidate');
    navigation.popToTop();
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        const candidateInterviewsPromise = candidateApi.get<InterviewsOutput>(
          '/interviews',
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        candidateInterviewsPromise
          .then(response => {
            response.data &&
              response.data.interviews &&
              setInterviews(response.data.interviews);
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
  }, []);

  const formatDate = (date: Date) =>
    `${date.toLocaleDateString()}${'\n'}${date.toLocaleTimeString()}`;

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <View
      style={[
        appThemeStyles.mainContainer,
        appThemeStyles.formItemcontainer,
        style.mainContainer,
      ]}>
      <Navbar
        homeNavigate={homeNavigate}
        interviewNavigate={() =>
          navigation.navigate('InterviewListScreen', {
            email,
            isCandidate,
          })
        }
        testNavigate={() => navigation.navigate('TestContentScreen')}
        logoutNavigate={logoutNavigate}
      />
      <View style={style.listContainer}>
        <Text style={style.title}>Finished Interviews</Text>
        {interviews.map(
          (interview, index) =>
            interview.result && (
              <View key={index} style={style.performanceContainer}>
                <WithDescriptionTitle
                  title={interview.company_name}
                  description=""
                  viewStyle={style.textContainer}
                />
                <WithDescriptionTitle
                  title="Interview"
                  description={formatDate(new Date(interview.schedule))}
                  viewStyle={style.textContainer}
                />
                <View style={style.scheduleButtonContainer}>
                  <Icon
                    name="circle-info"
                    size={25}
                    color={'black'}
                    onPress={() =>
                      navigation.navigate('InterviewResultsScreen', {
                        companyName: interview.company_name,
                        interviewId: interview.interview_id,
                        wasSelected: Boolean(interview.selected),
                      })
                    }
                  />
                </View>
              </View>
            ),
        )}
      </View>
      <View style={style.listContainer}>
        <Text style={style.title}>Upcoming Interviews</Text>
        {interviews.map(
          (interview, index) =>
            !interview.result && (
              <View key={index} style={style.performanceContainer}>
                <WithDescriptionTitle
                  title={interview.company_name}
                  description=""
                  viewStyle={style.textContainer}
                />
                <WithDescriptionTitle
                  title="Interview"
                  description={formatDate(new Date(interview.schedule))}
                  viewStyle={style.textContainer}
                />
              </View>
            ),
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    paddingVertical: 20,
    marginTop: -20,
  },
  listContainer: {
    marginVertical: 10,
  },
  title: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
    marginVertical: 10,
  },
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
    marginRight: 15,
  },
});
