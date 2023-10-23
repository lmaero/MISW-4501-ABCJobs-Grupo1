import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CandidateRegisterProfileScreen} from '../screens/candidate/CandidateRegisterProfileScreen';
import {CandidateRegisterScreen} from '../screens/candidate/CandidateRegisterScreen';

export type RootStackParams = {
  CandidateRegisterScreen: undefined;
  CandidateRegisterProfileScreen: {candidateEmail: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="CandidateRegisterScreen"
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
      </Stack.Navigator>
    </>
  );
};
