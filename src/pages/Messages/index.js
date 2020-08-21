import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ILMessageBg} from '../../assets';
import {List} from '../../components';
import {Fire} from '../../configs';
import {colors, fonts, getData} from '../../utils';
const Messages = ({navigation}) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messagesDB = rootDB.child(urlHistory);

    messagesDB.on('value', async (snapshot) => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];
        const promises = await Object.keys(oldData).map(async (key) => {
          const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
          const detailDoctor = await rootDB.child(urlUidDoctor).once('value');
          data.push({
            id: key,
            detailDoctor: detailDoctor.val(),
            ...oldData[key],
          });
        });
        await Promise.all(promises);
        setHistoryChat(data);
      }
    });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    dispatch({type: 'SET_LOADING', value: true});
    getData('user').then((res) => {
      dispatch({type: 'SET_LOADING', value: false});
      setUser(res);
    });
  };
  return (
    <View style={styles.page}>
      <ImageBackground source={ILMessageBg} style={styles.background}>
        <Text style={styles.title}>Messages</Text>
      </ImageBackground>
      <View style={styles.content}>
        {historyChat.map((chat) => {
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor,
          };
          return (
            <List
              key={chat.id}
              profile={{uri: chat.detailDoctor.photo}}
              name={chat.detailDoctor.fullName}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting', dataDoctor)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  background: {height: 150, paddingTop: 30},
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[800],
    color: colors.secondary,
    textAlign: 'center',
  },
});
