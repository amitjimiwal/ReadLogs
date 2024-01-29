export interface ReadSchema {
  title: string;
  readUrl: string;
  priority: number;
  userID: string;
  isRead: boolean;
}
export interface Read extends ReadSchema {
  id:string;
}


