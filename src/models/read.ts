export interface ReadSchema {
  title: string;
  readUrl: string | URL;
  priority: number;
  userID: string;
  isRead: boolean;
  previewImage: URL;
}
export interface Read extends ReadSchema {
  id:string;
}


