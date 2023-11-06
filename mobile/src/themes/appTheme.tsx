import {StyleSheet} from 'react-native';

export const appThemeStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  formItemcontainer: {
    justifyContent: 'flex-start',
  },
  formItemFullSize: {
    width: '100%',
  },
  formItemSmallSize: {
    width: '22%',
  },
  formItemMainMargin: {
    marginVertical: 12.5,
  },
  formItemSmallMargin: {
    marginVertical: 5,
  },
  mainTitleContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  labelTitle: {
    color: 'black',
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
  labelDescription: {
    color: '#A7A6A5',
    fontSize: 13,
    fontWeight: '500',
  },
  inputForm: {
    borderWidth: 1,
    borderColor: 'rgba(28, 31, 30, 0.50)',
    borderRadius: 10,
    height: 44,
  },
});
