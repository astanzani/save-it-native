import { useEffect, useState } from 'react';
import { EncryptedStoreKey, getSecret } from '../utils';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getSecret<string>(EncryptedStoreKey.JWT).then((jwt) => {
      setIsAuthenticated(!!jwt);
    });
  }, []);

  return [isAuthenticated];
}
