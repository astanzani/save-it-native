import { EncryptedStoreKey, getSecret } from '../utils';

export async function get(url: string, includeCredentials = true) {
  return fetch(url, { headers: await getHeaders(includeCredentials) });
}

export async function post(
  url: string,
  data: object,
  includeCredentials = true
) {
  const json = JSON.stringify(data);

  return fetch(url, {
    method: 'POST',
    body: json,
    headers: await getHeaders(includeCredentials),
  });
}

async function getHeaders(includeCredentials = true) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  if (includeCredentials) {
    const jwt = await getCredentials();
    headers.set('authorization', jwt!);
  }

  return headers;
}

async function getCredentials() {
  return getSecret<string>(EncryptedStoreKey.JWT);
}
