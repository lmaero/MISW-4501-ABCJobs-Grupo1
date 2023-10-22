import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {WithDescriptionPicker} from '../../components/WithDescriptionPicker';
import {roles} from '../../enums/Roles';
import {appThemeStyles} from '../../themes/appTheme';
import {WithDescriptionInput} from '../../components/WithDescriptionInput';
import {countries} from '../../enums/Countries';
import {WithDescriptionTitle} from '../../components/WithDescriptionTitle';
import {SecondaryTitle} from '../../components/SecondaryTitle';
import {SingleDatePicker} from '../../components/SingleDatePicker';
import {
  AcademicData,
  CandidateProfile,
  Experience,
} from '../../interfaces/Candidate';
import {MediumButton} from '../../components/MediumButton';
import candidateProfileSchema from '../../schemas/CandidateProfileSchema';
import {FormErrorMessage} from '../../components/FormErrorMessage';
import {employmentType} from '../../enums/EmploymentType';
import {techRolesValues} from '../../enums/TechRoles';
import {aWeekLaterDate} from '../../utils/DateFormat';
import {RootStackParams} from '../../navigator/StackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {
  RegisterProfileCandidateInput,
  transformRegisterProfileCandidateInput,
} from '../../interfaces/api/Inputs';
import candidateApi from '../../api/Candidate';
import {RegisterProfileCandidateOutput} from '../../interfaces/api/Outputs';
import {AxiosError} from 'axios';
import {LoadingScreen} from '../LoadingScreen';

interface Props
  extends StackScreenProps<RootStackParams, 'CandidateRegisterProfileScreen'> {}

export const CandidateRegisterProfileScreen = ({navigation, route}: Props) => {
  const {candidateEmail} = route.params;
  const {formItemSmallMargin} = appThemeStyles;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [educationSections, setEducationSections] = useState<AcademicData[]>([
    {
      endDate: new Date(aWeekLaterDate),
      grade: 0,
      obtainedDegree: '',
      schoolName: '',
      startDate: new Date(),
    },
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      endDate: new Date(aWeekLaterDate),
      title: '',
      company: '',
      employment: 'Full-Time',
      techRole: 'Fullstack Developer',
      startDate: new Date(),
    },
  ]);

  const addEducationSection = () => {
    setEducationSections([
      ...educationSections,
      {
        endDate: new Date(aWeekLaterDate),
        grade: 0,
        obtainedDegree: '',
        schoolName: '',
        startDate: new Date(),
      },
    ]);
  };

  const addExperienceSection = () => {
    setExperiences([
      ...experiences,
      {
        endDate: new Date(aWeekLaterDate),
        title: '',
        company: '',
        employment: 'Full-Time',
        techRole: 'Fullstack Developer',
        startDate: new Date(),
      },
    ]);
  };

  const onPressSend = (formData: CandidateProfile) => {
    if (candidateEmail) {
      setIsLoaded(true);
      const body: RegisterProfileCandidateInput =
        transformRegisterProfileCandidateInput(candidateEmail, formData);
      const registerProfileCandidatePromise =
        candidateApi.post<RegisterProfileCandidateOutput>(
          '/register/profile',
          JSON.stringify(body),
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
      registerProfileCandidatePromise
        .then(response => {
          setIsLoaded(false);
          response.data &&
            response.data?.candidates &&
            Alert.alert(
              'Success',
              'Your profile has been update successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.pop(),
                },
              ],
              {
                onDismiss: () => navigation.pop(),
              },
            );
        })
        .catch((error: AxiosError) => {
          setIsLoaded(false);
          error.code &&
            Alert.alert(
              'Error',
              'Error in the service, please try again later',
            );
        });
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(candidateProfileSchema),
  });

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <View style={appThemeStyles.mainContainer}>
      <ScrollView>
        <WithDescriptionTitle
          title="Complete your information"
          description="To apply for some projects, make sure your information is complete"
          viewStyle={styles.mainTitleContainer}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <WithDescriptionPicker
              title="Your best role"
              description="Select the position you're comfortable with"
              values={roles}
              selected={value}
              onChangeValue={onChange}
              placeholder="Roles"
              listMode="MODAL"
            />
          )}
          name="role"
        />
        {errors.role && (
          <FormErrorMessage text={errors.role.message} noMargin />
        )}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <WithDescriptionInput
              titleProps={{
                title: 'What languages do you speak?',
                description:
                  'Use comma-separated values to list your languages',
              }}
              textInputProps={{
                placeholder: 'English, Spanish, Russian',
                autoCapitalize: 'words',
                value,
                onChangeText: onChange,
              }}
            />
          )}
          name="spokenLanguages"
        />
        {errors.spokenLanguages && (
          <FormErrorMessage text={errors.spokenLanguages.message} noMargin />
        )}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <WithDescriptionInput
              titleProps={{
                title: 'What are your main soft-skills?',
                description:
                  'Use comma-separated values to list your soft-skills',
              }}
              textInputProps={{
                placeholder: 'Determination, Team-work',
                value,
                onChangeText: onChange,
                autoCapitalize: 'words',
              }}
            />
          )}
          name="mainSoftSkills"
        />
        {errors.mainSoftSkills && (
          <FormErrorMessage text={errors.mainSoftSkills.message} noMargin />
        )}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <WithDescriptionPicker
              title="Location"
              description="Select Your Country"
              values={countries}
              selected={value}
              onChangeValue={onChange}
              placeholder="Country"
              listMode="MODAL"
            />
          )}
          name="location"
        />
        {errors.location && (
          <FormErrorMessage text={errors.location.message} noMargin />
        )}
        <SecondaryTitle
          title="Academical Data"
          viewStyle={styles.secondaryTitleContainer}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <WithDescriptionInput
              titleProps={{
                title: 'Your certifications',
                description:
                  'Use comma-separated values to list your certifications',
              }}
              textInputProps={{
                placeholder: 'Python, AWS',
                autoCapitalize: 'words',
                value,
                onChangeText: onChange,
              }}
            />
          )}
          name="certifications"
        />
        {errors.certifications && (
          <FormErrorMessage text={errors.certifications.message} noMargin />
        )}
        <SecondaryTitle
          title="Add Study"
          viewStyle={styles.tertiaryTitleContainer}
        />
        {educationSections.map((educationSection, index) => (
          <View key={index}>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <WithDescriptionInput
                  titleProps={{
                    title: 'School name',
                    description: '',
                  }}
                  textInputProps={{
                    placeholder: 'Universidad de los Andes',
                    autoCapitalize: 'words',
                    value,
                    onChangeText: onChange,
                  }}
                />
              )}
              name={`academicData.${index}.schoolName`}
            />
            {errors.academicData?.[index]?.schoolName && (
              <FormErrorMessage
                text={errors.academicData?.[index]?.schoolName?.message}
                noMargin
              />
            )}
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <WithDescriptionInput
                  titleProps={{
                    title: 'Obtained degree',
                    description: '',
                  }}
                  textInputProps={{
                    placeholder: 'Msc. in Software Engineering',
                    value,
                    onChangeText: onChange,
                    autoCapitalize: 'words',
                  }}
                  useSmallMargin
                />
              )}
              name={`academicData.${index}.obtainedDegree`}
            />
            {errors.academicData?.[index]?.obtainedDegree && (
              <FormErrorMessage
                text={errors.academicData?.[index]?.obtainedDegree?.message}
                noMargin
              />
            )}
            <SafeAreaView
              style={[formItemSmallMargin, styles.dateRangeContainer]}>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <SingleDatePicker
                    label="Start Date"
                    date={value || new Date()}
                    onChangeDate={onChange}
                  />
                )}
                name={`academicData.${index}.startDate`}
              />
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <SingleDatePicker
                    label="End Date"
                    date={value || new Date(aWeekLaterDate)}
                    onChangeDate={onChange}
                  />
                )}
                name={`academicData.${index}.endDate`}
              />
            </SafeAreaView>
            {errors.academicData?.[index]?.startDate && (
              <FormErrorMessage
                text={errors.academicData?.[index]?.startDate?.message}
                noMargin
              />
            )}
            {errors.academicData?.[index]?.endDate && (
              <FormErrorMessage
                text={errors.academicData?.[index]?.endDate?.message}
                noMargin
              />
            )}
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <WithDescriptionInput
                  titleProps={{
                    title: 'Grade',
                    description: '',
                  }}
                  textInputProps={{
                    placeholder: '4.6',
                    autoCapitalize: 'words',
                    value: value?.toString(),
                    onChangeText: onChange,
                  }}
                  smallSize
                  useSmallMargin
                />
              )}
              name={`academicData.${index}.grade`}
            />
            {errors.academicData?.[index]?.grade && (
              <FormErrorMessage
                text={errors.academicData?.[index]?.grade?.message}
                noMargin
              />
            )}
          </View>
        ))}
        <MediumButton text="Add more education" onPress={addEducationSection} />
        <SecondaryTitle
          title="Technical Data"
          viewStyle={styles.secondaryTitleContainer}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <WithDescriptionInput
              titleProps={{
                title: 'Your tech-skills',
                description:
                  'Use comma-separated values to list your tech-skills',
              }}
              textInputProps={{
                placeholder: 'Git, Agile Frameworks, Heroku',
                autoCapitalize: 'words',
                value,
                onChangeText: onChange,
              }}
            />
          )}
          name="technicalData.techSkills"
        />
        {errors.technicalData?.techSkills && (
          <FormErrorMessage
            text={errors.technicalData?.techSkills.message}
            noMargin
          />
        )}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <WithDescriptionInput
              titleProps={{
                title: 'Programming languages',
                description:
                  'Use comma-separated values to list your programming languages',
              }}
              textInputProps={{
                placeholder: 'Python, Javascript, C#',
                autoCapitalize: 'words',
                value,
                onChangeText: onChange,
              }}
            />
          )}
          name="technicalData.programmingLanguages"
        />
        {errors.technicalData?.programmingLanguages && (
          <FormErrorMessage
            text={errors.technicalData?.programmingLanguages.message}
            noMargin
          />
        )}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <WithDescriptionInput
              titleProps={{
                title: 'Roles',
                description:
                  'Use comma-separated values to list your certifications',
              }}
              textInputProps={{
                placeholder: 'Cloud Engineer, Tech Lead',
                autoCapitalize: 'words',
                value,
                onChangeText: onChange,
              }}
            />
          )}
          name="technicalData.roles"
        />
        {errors.technicalData?.roles && (
          <FormErrorMessage
            text={errors.technicalData?.roles.message}
            noMargin
          />
        )}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <WithDescriptionInput
              titleProps={{
                title: 'Year of Exp',
                description: '',
              }}
              textInputProps={{
                placeholder: '3',
                autoCapitalize: 'words',
                value: value?.toString(),
                onChangeText: onChange,
              }}
              smallSize
              useSmallMargin
            />
          )}
          name="technicalData.yearsOfExperience"
        />
        {errors.technicalData?.yearsOfExperience && (
          <FormErrorMessage
            text={errors.technicalData?.yearsOfExperience.message}
            noMargin
          />
        )}
        <SecondaryTitle
          title="Experience"
          viewStyle={styles.secondaryTitleContainer}
        />
        {experiences.map((experience, index) => (
          <View key={index}>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <WithDescriptionInput
                  titleProps={{
                    title: 'Title',
                    description: '',
                  }}
                  textInputProps={{
                    placeholder: 'Computer Engineer',
                    autoCapitalize: 'words',
                    value,
                    onChangeText: onChange,
                  }}
                />
              )}
              name={`experienceData.${index}.title`}
            />
            {errors.experienceData?.[index]?.title && (
              <FormErrorMessage
                text={errors.experienceData?.[index]?.title?.message}
                noMargin
              />
            )}
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <WithDescriptionInput
                  titleProps={{
                    title: 'Company',
                    description: '',
                  }}
                  textInputProps={{
                    placeholder: 'Independent',
                    autoCapitalize: 'words',
                    value,
                    onChangeText: onChange,
                  }}
                  useSmallMargin
                />
              )}
              name={`experienceData.${index}.company`}
            />
            {errors.experienceData?.[index]?.company && (
              <FormErrorMessage
                text={errors.experienceData?.[index]?.company?.message}
                noMargin
              />
            )}
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <WithDescriptionPicker
                  title="Employment type"
                  description="Select Your Employment type"
                  values={employmentType}
                  selected={value}
                  placeholder="Employment type"
                  listMode="MODAL"
                  onChangeValue={onChange}
                />
              )}
              name={`experienceData.${index}.employment`}
            />
            {errors.experienceData?.[index]?.employment && (
              <FormErrorMessage
                text={errors.experienceData?.[index]?.employment?.message}
                noMargin
              />
            )}
            <SafeAreaView
              style={[formItemSmallMargin, styles.dateRangeContainer]}>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <>
                    <SingleDatePicker
                      label="Start Date"
                      date={value || new Date()}
                      onChangeDate={onChange}
                    />
                  </>
                )}
                name={`experienceData.${index}.startDate`}
              />

              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <SingleDatePicker
                    label="End Date"
                    date={value || new Date(aWeekLaterDate)}
                    onChangeDate={onChange}
                  />
                )}
                name={`experienceData.${index}.endDate`}
              />
            </SafeAreaView>
            {errors.experienceData?.[index]?.startDate && (
              <FormErrorMessage
                text={errors.experienceData?.[index]?.startDate?.message}
                noMargin
              />
            )}
            {errors.experienceData?.[index]?.endDate && (
              <FormErrorMessage
                text={errors.experienceData?.[index]?.endDate?.message}
                noMargin
              />
            )}
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <WithDescriptionPicker
                  title="Role"
                  description="Select the position you're comfortable with"
                  values={techRolesValues}
                  selected={value}
                  placeholder="Roles"
                  listMode="MODAL"
                  onChangeValue={onChange}
                />
              )}
              name={`experienceData.${index}.techRole`}
            />
            {errors.experienceData?.[index]?.techRole && (
              <FormErrorMessage
                text={errors.experienceData?.[index]?.techRole?.message}
                noMargin
              />
            )}
          </View>
        ))}
        <MediumButton
          text="Add more experience"
          onPress={addExperienceSection}
        />
        <View style={styles.buttonGroupContainer}>
          <MediumButton
            text="Cancel"
            onPress={() => console.log('Cancel button pressed')}
            buttonGroup
          />
          <MediumButton
            text="Save"
            onPress={handleSubmit(onPressSend)}
            secondary
            buttonGroup
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTitleContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  secondaryTitleContainer: {
    marginTop: 35,
  },
  tertiaryTitleContainer: {
    marginTop: 10,
    marginBottom: -10,
  },
  dateRangeContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: -60,
  },
  buttonGroupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
    marginVertical: 50,
  },
});
