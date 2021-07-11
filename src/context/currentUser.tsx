import React, { createContext, useContext } from 'react';
import { User } from '../api/types';

type State = { user: User | undefined };
type Dispatch = (action: Action) => void;
type Action = { type: 'set'; payload: User };

const CurrentUserContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'set':
      return { user: action.payload as User | undefined };
    default:
      throw new Error('Unreachable');
  }
}

export function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(reducer, { user: undefined });
  const value = { state, dispatch };

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error('useCurrentUser must be used within a CurrentUserContext');
  }

  return context;
}
