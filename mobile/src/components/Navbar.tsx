import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  isCompany?: boolean;
  homeNavigate?: () => void;
  interviewNavigate?: () => void;
  testNavigate?: () => void;
  logoutNavigate?: () => void;
}
export const Navbar = ({
  homeNavigate,
  interviewNavigate,
  testNavigate,
  logoutNavigate,
  isCompany = false,
}: Props) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity activeOpacity={0.75} onPress={homeNavigate}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: 'https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif',
            }}
            style={styles.avatar}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {!isCompany && (
          <TouchableOpacity activeOpacity={0.75} onPress={interviewNavigate}>
            <View>
              <Text style={[styles.buttonText, styles.mainText]}>
                Interviews
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity activeOpacity={0.75} onPress={testNavigate}>
          <View>
            <Text style={[styles.buttonText, styles.mainText]}>Test</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity activeOpacity={0.75} onPress={logoutNavigate}>
          <View>
            <Text style={[styles.buttonText, styles.redText]}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  logoutContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainText: {
    color: '#2C71F6',
  },
  redText: {
    color: 'red',
  },
});
