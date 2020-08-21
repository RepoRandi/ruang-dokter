import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Gap, Header, List, Profile} from '../../components';
import {Fire} from '../../configs';
import {colors, showError} from '../../utils';

const UserProfile = ({navigation, route}) => {
  const profile = route.params;
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Fire.auth()
      .signOut()
      .then(() => {
        dispatch({type: 'SET_LOADING', value: false});
        navigation.replace('GetStarted');
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Last Update Yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        desc="Last Update Yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Sing Out"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={signOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
});
