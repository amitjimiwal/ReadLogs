import { Client, Account, ID, AppwriteException, Databases } from "appwrite";
import config from "../config/config";

class AuthService {
  client = new Client();
  account;
  private databases;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }
  async createUserEntry({ userID }: { userID: string }) {
    //creating user entry on Signup to users collection and social Link collection
    try {
      await this.databases.createDocument(config.databaseID, config.userCollectionID, ID.unique(), {
        userID: userID,
        isEmailReminder: false
      });
      await this.databases.createDocument(config.databaseID, config.socialsCollectionID, ID.unique(), {
        userID: userID,
      })
    } catch (error) {
      console.log(error);
    }
  }
  async createUser({ email, password, name }: { email: string, password: string, name: string }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      await this.login({ email, password });
      await this.createUserEntry({ userID: userAccount.$id });
      if (userAccount) return this.login({ email, password });
      else return userAccount;
    } catch (error) {
      if (error instanceof AppwriteException) {
        return error;
      }
    }
  }
  async login({ email, password }: { email: string, password: string }) {
    try {
      const userData = await this.account.createEmailSession(email, password);
      return userData;
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
  async getCurrentUser() {
    try {
      const userData = await this.account.get();
      return userData;
    } catch (error) {
      console.log(error);
    }
  }
  async createGoogleOAuth2Session(redirect: string, success: string,) {
    try {
      await this.account.createOAuth2Session("google", success, redirect);
      const userinfo = await this.account.getSession('current');
      console.log(userinfo);
      return userinfo;
    } catch (error) {
      console.log(error);
    }
  }
}
const authService = new AuthService();
export default authService;