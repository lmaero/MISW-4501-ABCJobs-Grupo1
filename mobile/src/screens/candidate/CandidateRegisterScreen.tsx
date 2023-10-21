import React from 'react';
import {
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

export const CandidateRegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(candidateSchema),
  });

  const onPressSend = (formData: any) => {
    console.log(JSON.stringify(formData, null, 2));
  };

  return (
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
                title="Email"
                placeholder="youremail@yourdomain.com"
                value={value}
                keyboardType="email-address"
                onChangeText={onChange}
              />
            )}
            name="email"
          />
          {errors.email && <FormErrorMessage text={errors.email.message} />}
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <SingleInput
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
            <FormErrorMessage text={errors.password.message} />
          )}
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <SingleInput
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
            <FormErrorMessage text={errors.fullName.message} />
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
