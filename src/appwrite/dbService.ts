import { Client, Databases,ID} from "appwrite";
import config from "../config/config";
import Read from "../utils/interfaces/read";

class DbService {
     client = new Client();
     private databases;
     constructor() {
          this.client
               .setEndpoint(config.appwriteURL)
               .setProject(config.appwriteProjectID);
          this.databases = new Databases(this.client);
     }
     async getAllReads() {
          //get all the reads of the collection 
          //for testing purposes only
          try {
               const reads = await this.databases.listDocuments(config.databaseID, config.userReadCollectionID);
               return reads;
          } catch (error) {
               console.log(error);
          }
     }

     async addRead({ title, readUrl, reminderTime, priority, userID }: Read) {
          //add a read to the collection
          try {
               const read = await this.databases.createDocument(config.databaseID, config.userReadCollectionID,ID.unique(), JSON.stringify({ title, readUrl, reminderTime, priority, userID }));
               return read;
          } catch (error) {
               console.log(error);
          }
     }
     async updateRead() { }
     async deleteRead() { }
     async getRead() { }
}

const dbService = new DbService();
export default dbService;