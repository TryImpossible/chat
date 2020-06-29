import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import client from '../../client';

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputView: {
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    width: 220,
  },
  textInput: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});

const Login = ({ navigation }) => {
  let userName = '';

  const submit = React.useCallback(() => {
    if (!userName) {
      Alert.alert('请输入昵称');
      return;
    }
    client.login(userName);
    navigation.replace('Chat');
  }, [navigation, userName]);
  return (
    <View style={styles.login}>
      <Text style={{ fontSize: 20 }}>设置群聊显示的昵称</Text>
      <View style={styles.textInputView}>
        <TextInput
          style={styles.textInput}
          placeholder="请输入昵称..."
          onChangeText={text => {
            userName = text;
          }}
        />
      </View>
      <Button title="提交" onPress={submit} />
    </View>
  );
};

export default Login;
