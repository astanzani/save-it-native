import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import {
  Text,
  List,
  Portal,
  Dialog,
  RadioButton,
  useTheme,
} from 'react-native-paper';

import { AppBar } from '../../components/AppBar';
import { useThemeVariant, ThemeVariant } from '../../context/theme';

export function Settings({
  navigation,
}: DrawerScreenProps<ParamListBase, 'Settings'>) {
  const [visible, setVisible] = useState(false);
  const { state, dispatch } = useThemeVariant();
  const { colors } = useTheme();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleThemeChange = (theme: string) =>
    dispatch({ type: 'set', payload: theme as ThemeVariant });

  return (
    <View style={{ ...styles.root, backgroundColor: colors.background }}>
      <AppBar navigation={navigation} title="Settings" action="back" />
      <View>
        <List.Item
          title="Theme"
          description={state.theme}
          // style={styles.capitalized}
          descriptionStyle={styles.capitalized}
          left={() => <List.Icon icon="theme-light-dark" />}
          onPress={showDialog}
        />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Theme</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              value={state.theme}
              onValueChange={handleThemeChange}
            >
              <RadioButton.Item label="Light" value="light" />
              <RadioButton.Item label="Dark" value="dark" />
              <RadioButton.Item label="Follow System" value="system" />
              {/* <View style={styles.radioButton}>
                <Text>Light</Text>
                <RadioButton value="light" />
              </View>
              <View>
                <RadioButton value="dark" />
                <Text>Dark</Text>
              </View>
              <View>
                <RadioButton value="system" />
                <Text>Follow System</Text>
              </View> */}
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  capitalized: {
    textTransform: 'capitalize',
  },
  radioButton: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  list: {
    padding: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  },
  textEllipsis: {
    flex: 1,
    flexWrap: 'wrap',
  },
  title: {
    fontWeight: 'bold',
  },
});
