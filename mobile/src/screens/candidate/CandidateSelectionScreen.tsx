import React, {useMemo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {RootStackParams} from '../../navigator/StackNavigator';
import {appThemeStyles} from '../../themes/appTheme';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {MediumButton} from '../../components/MediumButton';
import {Result} from '../../interfaces/api/Outputs';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import companyApi from '../../api/Company';
import {AxiosError} from 'axios';
import {LoadingScreen} from '../LoadingScreen';
import {KeyboardAvoidingView} from 'react-native';

interface Props
  extends StackScreenProps<RootStackParams, 'CandidateSelectionScreen'> {}

export const CandidateSelectionScreen = ({navigation, route}: Props) => {
  const {companyName, candidateId, companyId, interviewId} = route.params;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>('');
  const [results, setResults] = useState<Result[]>([
    {
      score: 0,
      test: '',
    },
  ]);

  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Yes',
        value: 'yes',
        size: 20,
        color: '#2C71F6',
        borderColor: '#D8D8DA',
        selected: false,
        labelStyle: {
          color: 'black',
          marginLeft: 20,
        },
      },
      {
        id: '0',
        label: 'No',
        value: 'no',
        size: 20,
        color: '#2C71F6',
        borderColor: '#D8D8DA',
        selected: true,
        labelStyle: {
          color: 'black',
          marginLeft: 20,
        },
      },
    ],
    [],
  );

  const addResult = () => {
    setResults(prevState => {
      const newState = [...prevState];
      newState.push({
        score: 0,
        test: '',
      });
      return newState;
    });
  };

  const submitResults = () => {
    AsyncStorage.getItem('token').then(token => {
      setIsLoaded(true);
      if (token) {
        const companyPostResults = companyApi.post<String>(
          '/interviews/result',
          {
            companyId,
            candidateId,
            testId: interviewId,
            selected: Boolean(Number(selectedId)),
            results: results.map(res => [res.test, res.score]),
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        companyPostResults
          .then(response => {
            response.data &&
              response.data === 'Interview results published' &&
              Alert.alert(
                'Results',
                'Interview results submitted successfully',
              );
            setIsLoaded(false);
          })
          .catch((error: AxiosError) => {
            setIsLoaded(false);
            error.code &&
              Alert.alert(
                'Error',
                'Error in submit test interview, please try again later',
              );
          });
      } else {
        setIsLoaded(false);
      }
    });
  };

  return isLoaded ? (
    <LoadingScreen />
  ) : (
    <KeyboardAvoidingView
      style={[appThemeStyles.mainContainer, appThemeStyles.formItemcontainer]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.titleContainer}>
            <Icon
              name="arrow-left"
              size={25}
              color={'black'}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>Results {companyName}</Text>
            <Icon
              name="circle-plus"
              size={25}
              color={'#2C71F6'}
              onPress={addResult}
            />
          </View>
          <ScrollView style={styles.resultsContainer}>
            {results.map((input, index) => (
              <View key={index}>
                <TextInput
                  keyboardType="default"
                  style={[styles.input, styles.titleInput]}
                  value={input.test}
                  onChangeText={text =>
                    setResults(prevState => {
                      const newState = [...prevState];
                      newState[index].test = text;
                      return newState;
                    })
                  }
                />
                <View style={styles.barContainer}>
                  <ProgressBar
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={input.score / 100}
                    color="#2C71F6"
                    style={styles.bar}
                  />
                  <TextInput
                    keyboardType="numeric"
                    style={[styles.input, styles.scoreInput]}
                    value={input.score.toString()}
                    onChangeText={text =>
                      setResults(prevState => {
                        const newState = [...prevState];
                        if (Number(text) >= 1 && Number(text) <= 100) {
                          newState[index].score = Number(text);
                        }
                        return newState;
                      })
                    }
                  />
                </View>
              </View>
            ))}
          </ScrollView>
          <View
            style={[
              styles.submitPublishContainer,
              styles.marginSubmitPublishContainer,
            ]}>
            <Text style={[styles.submitPublishLabel, styles.textBold]}>
              Select for project?
            </Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              containerStyle={[
                styles.submitPublishContainer,
                styles.marginSubmitPublishRadioGroup,
              ]}
            />
            <MediumButton
              text="Publish"
              onPress={submitResults}
              buttonGroup={false}
              secondary={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  resultsContainer: {
    paddingVertical: 5,
  },
  progressBarContainer: {
    marginVertical: 5,
  },
  progressBarLabel: {
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  titleInput: {
    width: 300,
    height: 40,
    marginVertical: 10,
  },
  scoreInput: {
    width: 50,
    height: 40,
    marginHorizontal: 10,
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
  submitPublishContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  marginSubmitPublishContainer: {
    marginVertical: 20,
  },
  submitPublishLabel: {
    color: 'black',
    fontSize: 16,
  },
  marginSubmitPublishLabel: {
    marginVertical: 8,
  },
  marginSubmitPublishRadioGroup: {
    marginVertical: 5,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
