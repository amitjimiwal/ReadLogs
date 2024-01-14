import { Client, Account ,ID, AppwriteException} from "appwrite";
import config from "../config/config";



class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);
    this.account = new Account(this.client);
  }
  async createUser({ email, password, name }: { email: string, password: string, name: string }) {
    try {
      const userAccount=await this.account.create(ID.unique(),email, password, name);
      if(userAccount) return this.login({ email, password });
      else return userAccount;
    } catch (error) {
      if(error instanceof AppwriteException){
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
}
const authService = new AuthService();
export default authService;