import React, { useEffect, useState } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
  FlatList,
  View,
  StyleSheet,
  StatusBar,
  Image,
  Linking,
  Pressable,
} from 'react-native';
import { Text, Caption, useTheme } from 'react-native-paper';

import * as bookmarksApi from '../../api/bookmarks';
import * as usersApi from '../../api/users';
import { Bookmark } from '../../api/types';
import { AppBar } from '../../components/AppBar';
import { useCurrentUser } from '../../context/currentUser';

export function Home({ navigation }: DrawerScreenProps<ParamListBase, 'Home'>) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { dispatch } = useCurrentUser();
  const theme = useTheme();

  const bootstrap = async () => {
    const currentUser = await usersApi.getCurrentUser();
    const items = await bookmarksApi.getBookmarks();
    setBookmarks(items);
    dispatch({ type: 'set', payload: currentUser });
  };

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <View style={{ ...styles.root, backgroundColor: theme.colors.background }}>
      <AppBar navigation={navigation} title="All Bookmarks" />
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

function renderItem({ item }: { item: Bookmark }) {
  const onPressItem = () => {
    Linking.canOpenURL(item.url).then((canOpen) => {
      if (canOpen) {
        Linking.openURL(item.url);
      }
    });
  };

  return (
    <Pressable style={styles.row} onPress={onPressItem}>
      <Image source={{ uri: item.metadata.image }} style={styles.image} />
      <View style={{ flexShrink: 1 }}>
        <Text
          numberOfLines={1}
          style={{ ...styles.textEllipsis, ...styles.title }}
        >
          {item.metadata.title}
        </Text>
        <Text numberOfLines={3} style={styles.textEllipsis}>
          {item.metadata.description}
        </Text>
        <Caption numberOfLines={1}>{item.url}</Caption>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
