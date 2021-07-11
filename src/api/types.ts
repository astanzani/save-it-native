export interface BookmarkMetadata {
  title: string;
  description: string;
  image: string;
}

export interface Bookmark {
  id: string;
  url: string;
  metadata: BookmarkMetadata;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
}
