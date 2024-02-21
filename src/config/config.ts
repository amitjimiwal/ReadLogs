const config={
     appwriteURL:String(import.meta.env.VITE_APPWRITE_ENDPOINT),
     appwriteProjectID:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
     databaseID:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
     userReadCollectionID:String(import.meta.env.VITE_APPWRITE_USER_READ_COLLECTION_ID),
     userCollectionID:String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
     bucketID:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
     socialsCollectionID:String(import.meta.env.VITE_APPWRITE_SOCIAL_COLLECTION_ID),
     imagePreviewBaseURL:String(import.meta.env.VITE_IMAGEPREVIEW_ENDPOINT),
     frontendURL:String(import.meta.env.VITE_FRONTEND_ENDPOINT)
};
export default config;
