import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../utils';
import {Fire} from '../../configs';

const Splash = ({navigation}) => {
  useEffect(() => {
    const unSubscribe = Fire.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          //? User lagi login
          navigation.replace('MainApp');
        } else {
          //! User Logout
          navigation.replace('GetStarted');
        }
      }, 1000);
    });

    return () => unSubscribe();
  }, [navigation]);

  return (
    <View style={styles.page}>
      <ILLogo width={150} height={150} />
      <Text style={styles.title}>Ruang Dokter</Text>
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: fonts.primary[600],
    marginTop: 16,
  },
});
