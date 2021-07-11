import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar as NativeStatusBar,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Provider as PaperProvider,
  Drawer as PaperDrawer,
} from 'react-native-paper';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import { Home } from './src/screens/home';
import { SignIn } from './src/screens/sign-in';
import { Settings } from './src/screens/settings';
import { lightTheme, darkTheme } from './src/themes';
import { EncryptedStoreKey, getSecret } from './src/utils';
import { AppDrawer } from './src/components';
import { CurrentUserProvider } from './src/context/currentUser';
import { ThemeProvider, useThemeVariant } from './src/context/theme';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

function AppInner() {
  const [loadedAuth, setLoadedAuth] = useState(false);
  const [auth, setAuth] = useState(false);
  const preferredColorScheme = useColorScheme();
  const { state } = useThemeVariant();

  let theme = lightTheme;

  if (state.theme === 'system') {
    theme = preferredColorScheme === 'dark' ? darkTheme : lightTheme;
  } else {
    theme = state.theme === 'dark' ? darkTheme : lightTheme;
  }

  useEffect(() => {
    getSecret<boolean>(EncryptedStoreKey.JWT).then((isAuth) => {
      setAuth(!!isAuth);
      setLoadedAuth(true);
    });
  }, []);

  if (!loadedAuth) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <CurrentUserProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <AppDrawer {...props} />}
            initialRouteName={auth ? 'Home' : 'SignIn'}
          >
            <Drawer.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false, drawerLabel: () => null }}
            />
            <Drawer.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false, drawerLabel: () => null }}
            />
          </Drawer.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </CurrentUserProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  home: {
    flex: 1,
  },
  header: {
    paddingTop: NativeStatusBar.currentHeight,
  },
});
