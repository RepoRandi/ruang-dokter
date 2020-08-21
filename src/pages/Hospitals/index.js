import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {ILHospitalBg} from '../../assets';
import {colors, fonts} from '../../utils';

const Hospitals = () => {
  return (
    <View style={styles.page}>
      <ImageBackground source={ILHospitalBg} style={styles.background}>
        <Text style={styles.title}>Nearby Hospitals</Text>
        <Text style={styles.desc}>3 tersedia</Text>
      </ImageBackground>
      <View style={styles.content}>
        <View style={styles.view}>
          <MapView
            style={styles.maps}
            initialRegion={{
              latitude: -7.9771298,
              longitude: 112.6318751,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              draggable
              coordinate={{latitude: -7.9771298, longitude: 112.6318751}}
              title="Alun Alun Tugu Kota Malang"
              description="Taman kota kecil yang terawat baik ini memiliki kawasan berumput & kolam teratai yang mengelilingi tugu.."
            />
          </MapView>
        </View>
      </View>
    </View>
  );
};

export default Hospitals;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  background: {height: 240, paddingTop: 30},
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.border,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
  view: {
    position: 'absolute',
    top: 6,
    bottom: 6,
    left: 6,
    right: 6,
  },
  maps: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
