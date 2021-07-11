import * as apiClient from './client';
import { Bookmark } from './types';

const API_URL = 'https://save-it-web.herokuapp.com/api/v1/bookmarks';

export async function getBookmarks() {
  const response = await apiClient.get(API_URL);
  const json = await response.json();

  return json as Bookmark[];
}
