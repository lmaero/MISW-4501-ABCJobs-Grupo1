import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import {appThemeStyles} from '../../themes/appTheme';
import {WithDescriptionTitle} from '../../components/WithDescriptionTitle';
import {RootStackParams} from '../../navigator/StackNavigator';
import {CompanyInfoOutput} from '../../interfaces/api/Outputs';
import authApi from '../../api/Auth';
import {Navbar} from '../../components/Navbar';
import {LoadingScreen} from '../LoadingScreen';

interface Props
  extends StackScreenProps<RootStackParams, 'CompanyInfoDetail'> {}

export const CompanyInfoDetail = ({navigation, route}: Props) => {
  const {companyEmail} = route.params;
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoOutput>();

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        const companyInfoPromise = authApi.get<CompanyInfoOutput>('/me', {
          params: {
            email: companyEmail,
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        companyInfoPromise
          .then(response => {
            response.data &&
              response.data.userInfo &&
              setCompanyInfo(response.data);
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
  }, [navigation, companyEmail]);

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
            email: route.params?.companyEmail,
            isCandidate: false,
          })
        }
        testNavigate={() => navigation.navigate('ViewPerformancesScreen')}
        logoutNavigate={logoutNavigate}
        isCompany
      />
      <WithDescriptionTitle
        title="Company information"
        description="Company details"
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
          <Text style={[styles.itemText, styles.fontBold]}>Company Name</Text>
          <Text style={[styles.itemText, styles.fontLight]}>
            {companyInfo?.userInfo?.company_name}
          </Text>
        </View>
        <View
          style={[
            styles.itemContainer,
            styles.itemPaddingMid,
            styles.itemBorderBottom,
          ]}>
          <Text style={[styles.itemText, styles.fontBold]}>Email Address</Text>
          <Text style={[styles.itemText, styles.fontLight]}>
            {companyInfo?.userInfo?.email}
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
