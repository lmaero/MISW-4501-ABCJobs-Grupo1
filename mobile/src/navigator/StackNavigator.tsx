import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CandidateRegisterProfileScreen} from '../screens/candidate/CandidateRegisterProfileScreen';
import {CandidateRegisterScreen} from '../screens/candidate/CandidateRegisterScreen';
import {TestContentScreen} from '../screens/test/TestContentScreen';
import {ViewPerformancesScreen} from '../screens/test/ViewPerformancesScreen';

export type RootStackParams = {
  CandidateRegisterScreen: undefined;
  CandidateRegisterProfileScreen: {candidateEmail: string};
  TestContentScreen: undefined;
  ViewPerformancesScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="ViewPerformancesScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Stack.Screen
          name="CandidateRegisterScreen"
          component={CandidateRegisterScreen}
        />
        <Stack.Screen
          name="CandidateRegisterProfileScreen"
          component={CandidateRegisterProfileScreen}
        />
        <Stack.Screen name="TestContentScreen" component={TestContentScreen} />
        <Stack.Screen
          name="ViewPerformancesScreen"
          component={ViewPerformancesScreen}
        />
      </Stack.Navigator>
    </>
  );
};
