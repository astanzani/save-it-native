import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import {
  Button,
  Drawer as PaperDrawer,
  Title,
  Avatar,
  Text,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { StyleSheet, StatusBar, View } from 'react-native';

import * as usersApi from '../api/users';
import { CurrentUserProvider, useCurrentUser } from '../context/currentUser';

export function AppDrawer({
  navigation,
}: // state,
DrawerContentComponentProps<DrawerContentOptions>) {
  const { colors } = useTheme();
  const {
    state: { user },
  } = useCurrentUser();

  if (!user) {
    return null;
  }

  const onPressSignOut = async () => {
    await usersApi.logout();
    navigation.navigate('SignIn');
  };

  const onPressSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <PaperDrawer.Section
      style={{ ...styles.header, backgroundColor: colors.background }}
    >
      <View
        style={{
          ...styles.drawerContainer,
          backgroundColor: colors.background,
        }}
      >
        <View style={styles.userContainer}>
          <View style={styles.user}>
            <Avatar.Text
              label={user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
              size={32}
              style={styles.avatar}
            />
            <Text>{user.displayName}</Text>
          </View>
          <IconButton icon="cog" onPress={onPressSettings} />
        </View>
        <PaperDrawer.Item
          label="All bookmarks"
          icon="bookmark-multiple"
          onPress={() => navigation.navigate('Home')}
          active
        />
        <PaperDrawer.Item
          label="Trash - TODO"
          icon="delete"
          // onPress={() => navigation.navigate('Home')}
        />
      </View>
      <Button
        mode="text"
        icon="logout"
        color={colors.error}
        style={styles.signOutButton}
        onPress={onPressSignOut}
      >
        Sign Out
      </Button>
    </PaperDrawer.Section>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    alignContent: 'space-between',
  },
  avatar: {
    marginRight: 8,
  },
  userContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  title: {
    margin: 9,
  },
  header: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  signOutButton: {
    marginRight: 'auto',
  },
});
