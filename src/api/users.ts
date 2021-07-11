import { clearSecret, EncryptedStoreKey, setSecret } from '../utils';
import * as apiClient from './client';
import { User } from './types';

const API_URL = 'https://save-it-web.herokuapp.com/api/v1/users';

export async function login(email: string, password: string) {
  const url = API_URL + '/login';
  const response = await apiClient.post(url, { email, password }, false);

  if (!response.ok) {
    throw new Error('Could not login!');
  }

  const jwt = response.headers.get('x-auth-token');

  return setSecret(EncryptedStoreKey.JWT, jwt);
}

export async function logout() {
  return clearSecret(EncryptedStoreKey.JWT);
}

export async function getCurrentUser(): Promise<User> {
  const url = API_URL + '/current';
  const response = await apiClient.get(url);

  if (!response.ok) {
    throw new Error('Could not get current user data!');
  }

  return response.json() as Promise<User>;
}
