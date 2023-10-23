import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {BusinessLogo} from '../../components/BusinessLogo';
import {MainTitle} from '../../components/MainTitle';
import {SingleInput} from '../../components/SingleInput';
import {ExtraLargeButton} from '../../components/ExtraLargeButton';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import candidateSchema from '../../schemas/CandidateSchema';
import {FormErrorMessage} from '../../components/FormErrorMessage';
import {appThemeStyles} from '../../themes/appTheme';
import {RegisterCandidateOutput} from '../../interfaces/api/Outputs';
import {Candidate} from '../../interfaces/Candidate';
import candidateApi from '../../api/Candidate';
import {AxiosError} from 'axios';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/StackNavigator';
import {LoadingScreen} from '../LoadingScreen';

interface Props
  extends StackScreenProps<RootStackParams, 'CandidateRegisterScreen'> {}

export const CandidateRegisterScreen = ({navigation}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(candidateSchema),
  });

  const onPressSend = (formData: Candidate) => {
    setIsLoaded(true);
    const registerCandidatePromise = candidateApi.post<RegisterCandidateOutput>(
      '/register',
      JSON.stringify(formData),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    registerCandidatePromise
      .then(response => {
        setIsLoaded(false);
        response.data &&
          response.data?.email &&
          navigation.navigate('CandidateRegisterProfileScreen', {
            candidateEmail: response.data?.email,
          });
      })
      .catch((error: AxiosError) => {
        setIsLoaded(false);
        error.code &&
          Alert.alert(
            'Error',
            'The user already exists or the service has problems',
          );
      });
  };

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <KeyboardAvoidingView
      style={appThemeStyles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <BusinessLogo height={71} width={72} />
          <MainTitle
            text="Be hired by the most
            amazing companies.
            Register today!"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <SingleInput
                testID="single-input-email"
                title="Email"
                placeholder="youremail@yourdomain.com"
                value={value}
                keyboardType="email-address"
                onChangeText={onChange}
              />
            )}
            name="email"
          />
          {errors.email && (
            <FormErrorMessage text={errors.email.message} noMargin />
          )}
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <SingleInput
                testID="single-input-password"
                title="Password"
                placeholder="************"
                value={value}
                isPassword
                onChangeText={onChange}
              />
            )}
            name="password"
          />
          {errors.password && (
            <FormErrorMessage text={errors.password.message} noMargin />
          )}
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <SingleInput
                testID="single-input-full-name"
                title="Full Name"
                placeholder="John Smith"
                value={value}
                autoCapitalize="words"
                onChangeText={onChange}
              />
            )}
            name="fullName"
          />
          {errors.fullName && (
            <FormErrorMessage text={errors.fullName.message} noMargin />
          )}
          <ExtraLargeButton
            text="Register"
            onPress={handleSubmit(onPressSend)}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingViewContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
});
