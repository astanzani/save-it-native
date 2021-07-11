import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import { DrawerNavigationState } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';
import React from 'react';
import { Appbar as PaperAppBar } from 'react-native-paper';

export function AppBar({
  navigation,
  title,
  action = 'menu',
}: {
  navigation: DrawerNavigationProp<ParamListBase>;
  title: string;
  action?: 'menu' | 'back';
}) {
  const onPressAction = () => {
    action === 'menu' ? navigation.toggleDrawer() : navigation.goBack();
  };

  return (
    <PaperAppBar>
      <PaperAppBar.Action
        icon={action === 'menu' ? 'menu' : 'arrow-left'}
        onPress={onPressAction}
      />
      <PaperAppBar.Content title={title} />
    </PaperAppBar>
  );
}
