/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

window.navigator.userAgent = 'react-native';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import io from 'socket.io-client';
import KeyboardSpacer from './components/KeyboardSpacer';

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: '#eeeeee',
    height: '100%',
    paddingHorizontal: 8,
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 48,
  },
  btn: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(130, 224, 255)',
    paddingHorizontal: 12,
    marginLeft: 12,
  },
});

const App = () => {
  const socket = io('http://192.168.1.101:3001/users/1', {
    transports: ['websocket'], // you need to explicitly tell it to use websockets
    forceNew: true,
  });
  socket.on('connect', () => {
    console.warn('connected!');
    // socket.send(123);
  });
  socket.on('message', data => {
    console.warn(data);
  });

  const [data, setData] = React.useState([]);

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          data={data}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1, paddingHorizontal: 12}}>
                <Text style={{fontSize: 15}}>{item}</Text>
              </View>
            );
          }}
        />
        <View style={styles.btnWrap}>
          <TextInput style={styles.input} placeholder="请输入..." />
          <TouchableOpacity style={styles.btn}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
        <KeyboardSpacer />
      </SafeAreaView>
    </>
  );
};

export default App;
