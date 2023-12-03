import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CandidateRegisterProfileScreen} from '../screens/candidate/CandidateRegisterProfileScreen';
import {CandidateRegisterScreen} from '../screens/candidate/CandidateRegisterScreen';
import {TestContentScreen} from '../screens/test/TestContentScreen';
import {ViewPerformancesScreen} from '../screens/test/ViewPerformancesScreen';
import {InterviewResultsScreen} from '../screens/interview/InterviewResultsScreen';
import {CandidateSelectionScreen} from '../screens/candidate/CandidateSelectionScreen';
import {InterviewListScreen} from '../screens/interview/InterviewListScreen';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {CandidateInfoDetail} from '../screens/candidate/CandidateInfoDetail';
import {CompanyInfoDetail} from '../screens/company/CompanyInfoDetail';

export type RootStackParams = {
  LoginScreen: undefined;
  CandidateRegisterScreen: undefined;
  CandidateRegisterProfileScreen: {candidateEmail: string};
  CandidateInfoDetail: {candidateEmail: string};
  CompanyInfoDetail: {companyEmail: string};
  InterviewListScreen: {isCandidate: boolean; email: string};
  ViewPerformancesScreen: undefined;
  CandidateSelectionScreen: {
    interviewId: number;
    companyId: number;
    candidateId: number;
    companyName: string;
  };
  TestContentScreen: undefined;
  InterviewResultsScreen: {
    interviewId: number;
    wasSelected: boolean;
    companyName: string;
  };
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="CandidateRegisterScreen"
          component={CandidateRegisterScreen}
        />
        <Stack.Screen
          name="CandidateRegisterProfileScreen"
          component={CandidateRegisterProfileScreen}
        />
        <Stack.Screen
          name="CandidateInfoDetail"
          component={CandidateInfoDetail}
        />
        <Stack.Screen
          name="CandidateSelectionScreen"
          component={CandidateSelectionScreen}
        />
        <Stack.Screen name="CompanyInfoDetail" component={CompanyInfoDetail} />
        <Stack.Screen name="TestContentScreen" component={TestContentScreen} />
        <Stack.Screen
          name="ViewPerformancesScreen"
          component={ViewPerformancesScreen}
        />
        <Stack.Screen
          name="InterviewListScreen"
          component={InterviewListScreen}
        />
        <Stack.Screen
          name="InterviewResultsScreen"
          component={InterviewResultsScreen}
        />
      </Stack.Navigator>
    </>
  );
};
