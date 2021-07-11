import * as SecureStore from 'expo-secure-store';

export enum EncryptedStoreKey {
  JWT = 'jwt',
}

export async function setSecret<T>(key: EncryptedStoreKey, value: T) {
  return SecureStore.setItemAsync(key, JSON.stringify(value));
}

export async function getSecret<T>(
  key: EncryptedStoreKey
): Promise<T | undefined> {
  const value = await SecureStore.getItemAsync(key);

  return value ? JSON.parse(value) : undefined;
}

export async function clearSecret(key: EncryptedStoreKey) {
  return SecureStore.deleteItemAsync(key);
}
