import 'react-native-gesture-handler';
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
  Alert,
} from 'react-native';
import KeyboardSpacer from '../../components/KeyboardSpacer';
import client from '../../client';

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
  notice: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
    color: 'gray',
    marginVertical: 8,
  },
  msgBox: {
    marginHorizontal: 12,
    flexDirection: 'row',
  },
  msgUserName: {
    fontSize: 12,
    color: 'black',
  },
  msgContentWrap: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  msgConten: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    color: 'black',
  },
});

const MSG_TYPE = { NOTICE: 'notice', SENDER: 'sender', RECEIVER: 'receiver' };

const Chat = () => {
  let textInputRef = null;
  let content = '';
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    client
      .onJoin()
      .then(msg => {
        const item = { type: MSG_TYPE.NOTICE, data: msg };
        setMessages([].concat(messages).concat([item]));
      })
      .catch(() => {});
    client
      .onMessage()
      .then(msg => {
        const item = { type: MSG_TYPE.RECEIVER, data: msg };
        setMessages([].concat(messages).concat([item]));
      })
      .catch(() => {});
  });

  const onSendPress = React.useCallback(() => {
    if (!content) {
      Alert.alert('请输入内容');
      return;
    }
    const data = {
      userId: client.userId,
      userName: client.userName,
      content,
    };
    client.send(data);
    const msg = {
      type: MSG_TYPE.SENDER,
      data,
    };
    setMessages([].concat(messages).concat([msg]));
    textInputRef && textInputRef.setNativeProps({ text: '' });
  }, [content, messages, textInputRef]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={messages}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item: { type, data } }) => {
            if (type === MSG_TYPE.NOTICE) {
              const { userName } = data;
              return <Text style={styles.notice}>{`${userName}加入群聊`}</Text>;
            }
            if (type === MSG_TYPE.SENDER) {
              const { userName } = data;
              return (
                <View style={[styles.msgBox, { justifyContent: 'flex-end' }]}>
                  <View style={styles.msgContentWrap}>
                    <Text style={styles.msgConten}>{data.content}</Text>
                  </View>
                  <Text style={[styles.msgUserName, { marginLeft: 8 }]}>
                    {userName}
                  </Text>
                </View>
              );
            }
            if (type === MSG_TYPE.RECEIVER) {
              const { userName } = data;
              return (
                <View style={styles.msgBox}>
                  <Text style={[styles.msgUserName, { marginRight: 8 }]}>
                    {userName}
                  </Text>
                  <View style={styles.msgContentWrap}>
                    <Text style={styles.msgConten}>{data.content}</Text>
                  </View>
                </View>
              );
            }
            return null;
          }}
        />
        <View style={styles.btnWrap}>
          <TextInput
            ref={ref => (textInputRef = ref)}
            style={styles.input}
            placeholder="请输入..."
            onChangeText={text => {
              content = text;
            }}
          />
          <TouchableOpacity style={styles.btn} onPress={onSendPress}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
        <KeyboardSpacer />
      </SafeAreaView>
    </>
  );
};

export default Chat;
