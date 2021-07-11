import React, { createContext, useContext, useReducer } from 'react';
// import { ColorSchemeName } from 'react-native';

export type ThemeVariant = 'light' | 'dark' | 'system';
type State = { theme: ThemeVariant };
type Dispatch = (action: Action) => void;
type Action = { type: 'set'; payload: ThemeVariant };

const ThemeContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'set':
      return { theme: action.payload as ThemeVariant };
    default:
      throw new Error('Unreachable');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { theme: 'light' });
  const value = { state, dispatch };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeVariant() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeVariant must be used within a ThemeContext');
  }

  return context;
}
