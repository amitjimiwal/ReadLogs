const config={
     appwriteURL:String(import.meta.env.VITE_APPWRITE_ENDPOINT),
     appwriteProjectID:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
     databaseID:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
     userReadCollectionID:String(import.meta.env.VITE_APPWRITE_USER_READ_COLLECTION_ID),
     bucketID:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};
export default config;
