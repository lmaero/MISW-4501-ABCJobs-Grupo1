import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosError} from 'axios';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {appThemeStyles} from '../../themes/appTheme';
import {BusinessLogo} from '../../components/BusinessLogo';
import {MainTitle} from '../../components/MainTitle';
import {SingleInput} from '../../components/SingleInput';
import {ExtraLargeButton} from '../../components/ExtraLargeButton';
import {MediumButton} from '../../components/MediumButton';
import {RootStackParams} from '../../navigator/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {WithDescriptionPicker} from '../../components/WithDescriptionPicker';
import {loginRolesValues} from '../../enums/TechRoles';
import loginSchema from '../../schemas/LoginSchema';
import {FormErrorMessage} from '../../components/FormErrorMessage';
import {LoginData} from '../../interfaces/Auth';
import {LoadingScreen} from '../LoadingScreen';
import authApi from '../../api/Auth';
import {LoginOutput} from '../../interfaces/api/Outputs';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const onPressSend = (formData: LoginData) => {
    setIsLoaded(true);
    const loginPromise = authApi.post<LoginOutput>(
      '',
      JSON.stringify(formData),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    loginPromise
      .then(response => {
        setIsLoaded(false);
        if (response.data && response.data?.token) {
          const isCandidate: boolean = formData.type === 'Candidate';
          AsyncStorage.setItem('token', response.data.token);
          AsyncStorage.setItem('email', response.data.email);
          AsyncStorage.setItem('isCandidate', String(isCandidate));
          isCandidate
            ? navigation.navigate('CandidateInfoDetail', {
                candidateEmail: formData.email,
              })
            : navigation.navigate('CompanyInfoDetail', {
                companyEmail: formData.email,
              });
        }
      })
      .catch((error: AxiosError) => {
        setIsLoaded(false);
        error.code &&
          Alert.alert('Error', 'Error in Login action, please try again later');
      });
  };

  const goToRegisterCandidate = () => {
    navigation.navigate('CandidateRegisterScreen');
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <KeyboardAvoidingView
      style={appThemeStyles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer}>
          <BusinessLogo height={71} width={72} />
          <MainTitle text="Start working today!" />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <SingleInput
                title="Email"
                placeholder="youremail@yourdomain.com"
                keyboardType="email-address"
                value={value}
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
                onChangeText={onChange}
                isPassword
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
              <WithDescriptionPicker
                title=""
                description="Select your role"
                values={loginRolesValues}
                selected={value}
                onChangeValue={onChange}
                placeholder="role"
                listMode="MODAL"
              />
            )}
            name="type"
          />
          {errors.type && (
            <FormErrorMessage text={errors.type.message} noMargin />
          )}
          <ExtraLargeButton
            text="Sign In"
            onPress={handleSubmit(onPressSend)}
          />
          <View style={styles.registerButtonsContainer}>
            <MediumButton
              text="Register as a candidate"
              onPress={goToRegisterCandidate}
            />
          </View>
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
  registerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 50,
    marginTop: 20,
  },
});
