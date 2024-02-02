import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";
import { ReadSchema } from "../models/read";
import preview from '@/assets/images/preview.png'
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

     async addRead({ title, readUrl, isRead = false, priority, userID }: ReadSchema) {
          //checking the image preview and adding some other image if it can't be extracted from it.
          let res;
          try {
               const preview = await fetch(`${config.imagePreviewBaseURL}/?url=${String(readUrl)}`);
               res = await preview.json();
               if (res.success === false) res = "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg";
               else res = res.image;
               // res="https://asset.cloudinary.com/dejzy9q65/e98a73879a9f75d958422df83b05edf0";
               //add a read to the collection
               const read = await this.databases.createDocument(config.databaseID, config.userReadCollectionID, ID.unique(), { title, readUrl, isRead, priority, userID, previewImage: new URL(res) });
               return read;
          } catch (error) {
               console.log("Error while adding doc" + error);
          }
     }
     async updateRead({ documentID, updates }: {
          documentID: string,
          updates: {
               title?: string,
               readUrl?: string | URL,
               priority?: number
               isRead?: boolean
               previewImage?: URL
          }
     }) {
          //update a read in the collection
          try {
               if (updates.readUrl) {
                    const preview = await fetch(`${config.imagePreviewBaseURL}/?url=${String(updates.readUrl)}`);
                    const res = await preview.json();
                    updates.previewImage = new URL(res.image);
               }
               const read = await this.databases.updateDocument(config.databaseID, config.userReadCollectionID, documentID, JSON.stringify({ ...updates }));
               return read;
          } catch (error) {
               console.log(error);
          }
     }
     async deleteRead({ documentID }: { documentID: string }) {
          //delete a read from the collection
          try {
               const read = await this.databases.deleteDocument(config.databaseID, config.userReadCollectionID, documentID);
               return read;
          } catch (error) {
               console.log(error);
          }
     }
     async getRead({ userID }: { userID: string }) {
          //get all the reads of the user
          try {
               const reads = await this.databases.listDocuments(config.databaseID, config.userReadCollectionID, [
                    Query.equal("userID", [userID])
               ]);
               return reads;
          } catch (error) {
               console.log("Error in GetRead():  " + error);
          }
     }
}

const dbService = new DbService();
export default dbService;