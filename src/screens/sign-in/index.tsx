import React, { useState } from 'react';
import { Button, TextInput, Title } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

import * as usersApi from '../../api/users';

export function SignIn({
  navigation,
}: StackScreenProps<ParamListBase, 'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  const onPressSignIn = async () => {
    await usersApi.login(email, password);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Sign In</Title>
      <TextInput
        style={styles.input}
        label="Email"
        // placeholder="Email"
        mode="outlined"
        left={<TextInput.Icon name="at" />}
        autoCompleteType="email"
        value={email}
        onChangeText={onChangeEmail}
      />
      <TextInput
        style={styles.input}
        label="Password"
        // placeholder="Password"
        mode="outlined"
        secureTextEntry={true}
        left={<TextInput.Icon name="lock" />}
        autoCompleteType="password"
        value={password}
        onChangeText={onChangePassword}
      />
      <Button style={styles.btn} onPress={onPressSignIn} mode="contained">
        Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    marginLeft: 24,
    marginRight: 24,
  },
  btn: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
