import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import {appThemeStyles} from '../../themes/appTheme';
import {WithDescriptionTitle} from '../../components/WithDescriptionTitle';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/StackNavigator';
import {LoadingScreen} from '../LoadingScreen';
import authApi from '../../api/Auth';
import {CandidateInfoOutput} from '../../interfaces/api/Outputs';
import {Navbar} from '../../components/Navbar';

interface Props
  extends StackScreenProps<RootStackParams, 'CandidateInfoDetail'> {}

export const CandidateInfoDetail = ({navigation, route}: Props) => {
  const {candidateEmail} = route.params;
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfoOutput>();

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        const candidateInfoPromise = authApi.get<CandidateInfoOutput>('/me', {
          params: {
            email: candidateEmail,
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        candidateInfoPromise
          .then(response => {
            response.data &&
              response.data.userInfo &&
              setCandidateInfo(response.data);
            setIsLoaded(false);
          })
          .catch((error: AxiosError) => {
            setIsLoaded(false);
            error.code && navigation.navigate('LoginScreen');
          });
      } else {
        setIsLoaded(false);
        navigation.navigate('LoginScreen');
      }
    });
  }, [navigation, candidateEmail]);

  const logoutNavigate = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('email');
    AsyncStorage.removeItem('isCandidate');
    navigation.popToTop();
  };

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <View style={[appThemeStyles.mainContainer, styles.scrollContainer]}>
      <Navbar
        interviewNavigate={() =>
          navigation.navigate('InterviewListScreen', {
            email: route.params?.candidateEmail,
            isCandidate: true,
          })
        }
        testNavigate={() => navigation.navigate('TestContentScreen')}
        logoutNavigate={logoutNavigate}
      />
      <WithDescriptionTitle
        title="Candidate information"
        description="Candidate details"
        viewStyle={appThemeStyles.mainTitleContainer}
      />
      <ScrollView>
        <View
          style={[
            styles.itemContainer,
            styles.itemPaddingMid,
            styles.itemBorderTop,
            styles.itemBorderBottom,
          ]}>
          <Text style={[styles.itemText, styles.fontBold]}>Full Name</Text>
          <Text style={[styles.itemText, styles.fontLight]}>
            {candidateInfo?.userInfo.first_name}{' '}
            {candidateInfo?.userInfo.last_name}
          </Text>
        </View>
        <View
          style={[
            styles.itemContainer,
            styles.itemPaddingMid,
            styles.itemBorderBottom,
          ]}>
          <Text style={[styles.itemText, styles.fontBold]}>Email address</Text>
          <Text style={[styles.itemText, styles.fontLight]}>
            {candidateInfo?.userInfo.email}
          </Text>
        </View>
        <View
          style={[
            styles.itemContainer,
            styles.itemPaddingMid,
            styles.itemBorderBottom,
          ]}>
          <Text style={[styles.itemText, styles.fontBold]}>Role</Text>
          <Text style={[styles.itemText, styles.fontLight]}>
            {candidateInfo?.userInfo.type}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemPaddingMid: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  itemPaddingSm: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemBorderTop: {
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
  },
  itemBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  itemTitle: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  fontBold: {
    fontWeight: '600',
  },
  fontLight: {
    fontWeight: '300',
  },
});
