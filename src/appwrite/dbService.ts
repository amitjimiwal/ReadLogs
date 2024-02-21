import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";
import { ReadSchema } from "../models/read";
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
          let previewImageUrl;
          try {
               const preview = await fetch(`${config.imagePreviewBaseURL}/?url=${encodeURIComponent(String(readUrl))}`);
               const res = await preview.json();
               if (res.sucess === false) {
                    // Use a default image URL if preview extraction fails
                    previewImageUrl = "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg";
               } else {
                    previewImageUrl = res.image;
               }
          } catch (error) {
               console.log("Error while fetching preview image: " + error);
               // Use a default image URL if there's an error fetching the image
               previewImageUrl = "https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg";
          }

          try {
               //add a read to the collection
               const read = await this.databases.createDocument(config.databaseID, config.userReadCollectionID, ID.unique(), {
                    title,
                    readUrl,
                    isRead,
                    priority,
                    userID,
                    previewImage: new URL(previewImageUrl)
               });
               return read;
          } catch (error) {
               console.log("Error while adding doc: " + error);
               throw error; // Rethrow the error to handle it upstream if needed
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

     //Email Reminders Functions
     async getEmailReminder({ userID }: { userID: string }) {
          //get the email reminder of the user
          try {
               const user = await this.databases.listDocuments(config.databaseID, config.userCollectionID, [
                    Query.equal("userID", [userID])
               ]);
               return user;
          } catch (error) {
               console.log(error);
          }
     }
     async updateEmailReminder({ documentID, isEmailReminder }: { documentID: string, isEmailReminder: boolean }) {
          //update the email reminder of the user
          try {
               const data = await this.databases.updateDocument(config.databaseID, config.userCollectionID, documentID, JSON.stringify({ isEmailReminder }));
               return data;
          } catch (error) {
               console.log(error);
          }
     }
     //get user socials
     async getSocials({ userID }: { userID: string }) {
          //get the socials of the user
          try {
               const socials = await this.databases.listDocuments(config.databaseID, config.socialsCollectionID, [
                    Query.equal("userID", [userID])
               ]);
               return socials;
          } catch (error) {
               console.log(error);
          }
     }
     //update socials
     async updateSocials({ documentID, social }: {
          documentID: string, social: {
               name: string;
               url: URL | string | null;
          }
     }) {
          //update the socials of the user
          try {
               const data = await this.databases.updateDocument(config.databaseID, config.socialsCollectionID, documentID, JSON.stringify({ [social.name]: social.url }));
               return data;
          } catch (error) {
               console.log(error);
          }
     }
}

const dbService = new DbService();
export default dbService;