import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ILNullPhoto} from '../../assets';
import {
  DoctorCategory,
  DoctorRated,
  Gap,
  HomeProfile,
  NewsItem,
} from '../../components';
import {Fire} from '../../configs';
import {colors, fonts, getData, showError} from '../../utils';

const Doctors = ({navigation}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserData();
    });
    getCategoryDoctor();
    getTopRatedDoctors();
    getNews();
  }, [navigation]);

  const getUserData = () => {
    dispatch({type: 'SET_LOADING', value: true});
    getData('user').then((res) => {
      dispatch({type: 'SET_LOADING', value: false});
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  };

  const getCategoryDoctor = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Fire.database()
      .ref('category_doctor/')
      .once('value')
      .then((res) => {
        dispatch({type: 'SET_LOADING', value: false});
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setCategoryDoctor(filterData);
        }
      })
      .catch((err) => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
      });
  };

  const getTopRatedDoctors = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Fire.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(5)
      .once('value')
      .then((res) => {
        dispatch({type: 'SET_LOADING', value: false});
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setDoctors(data);
        }
      })
      .catch((err) => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
      });
  };

  const getNews = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Fire.database()
      .ref('news/')
      .once('value')
      .then((res) => {
        dispatch({type: 'SET_LOADING', value: false});
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter((el) => el !== null);
          setNews(filterData);
        }
      })
      .catch((err) => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile', profile)}
            />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map((item) => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map((doctor) => {
              return (
                <DoctorRated
                  key={doctor.id}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  avatar={{uri: doctor.data.photo}}
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              );
            })}

            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map((item) => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {paddingHorizontal: 16},
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  wrapperScroll: {marginHorizontal: -16},
  category: {flexDirection: 'row'},
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
