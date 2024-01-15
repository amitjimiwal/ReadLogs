import { Client, Databases, ID, Query } from "appwrite";
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
     async getAllReads({ role }: { role: string }) {
          //get all the reads of the collection 
          //for testing purposes only
          try {
               if (role === "admin") {
                    const reads = await this.databases.listDocuments(config.databaseID, config.userReadCollectionID);
                    return reads;
               } else {
                    throw new Error("You are not authorized to access this resource");
               }
          } catch (error) {
               console.log(error);
          }
     }

     async addRead({ title, readUrl, reminderTime, priority, userID }: Read) {
          //add a read to the collection
          try {
               const read = await this.databases.createDocument(config.databaseID, config.userReadCollectionID, ID.unique(), JSON.stringify({ title, readUrl, reminderTime, priority, userID }));
               return read;
          } catch (error) {
               console.log(error);
          }
     }
     async updateRead({ title, documentID, newPriority, readUrl }: {
          title: string,
          documentID: string,
          newPriority: string,
          readUrl: string
     }) {
          //update a read in the collection
          try {
               const read = await this.databases.updateDocument(config.databaseID, config.userReadCollectionID, documentID, JSON.stringify({ title, readUrl, priority: newPriority }));
               return read;
          } catch (error) {
               console.log(error);
          }
     }
     async deleteRead({documentID} :{documentID:string}) { 
          //delete a read from the collection
          try {
               const read = await this.databases.deleteDocument(config.databaseID, config.userReadCollectionID, documentID);
               return read;
          } catch (error) {
               console.log(error);
          }
     }
     async getRead({userID} :{userID:string}) {   
          //get all the reads of the user
          try {
               const reads = await this.databases.listDocuments(config.databaseID, config.userReadCollectionID,[
                    Query.equal("userID", userID)
               ]);
               return reads;
          } catch (error) {
               console.log("Error in GetRead():  "+ error);
          }
     }
}

const dbService = new DbService();
export default dbService;