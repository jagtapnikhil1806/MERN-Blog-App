import { Client, Databases,Storage ,Query,ID} from "appwrite";
import conf from "../conf/conf.js";



export class Service{
    client=new Client();
    database;
    storage;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId)
        this.database=new Databases(this.client)
        this.storage=new Storage(this.client)
    }
   
    async createPost({title,slug,userId,content,status,featuredImage}){
        try {
        return await this.database
        .createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,
            {
                title,
                userId,
                content,
                status,
                featuredImage,
               
               
            })

            
        } catch (error) {
            console.log("Appwrite Error :: createPost Error ::" ,error )
            return false
        }
    }

    async updatePost(slug,{title,userId,content,status,featuredImage}){
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                userId,
                content,
                status,
                featuredImage,
                
            })

            
        } catch (error) {
            console.log("Appwrite Error :: updatePost Error ::" ,error )
            return false
        }
    }
    async deletePost(slug){
        try {
            return await this.database.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log("Appwrite Error :: deletePost Error ::" ,error )
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.database.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log("Appwrite Error :: getPost Error ::" ,error )
            return false
           
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.database.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries
                )
        } catch (error) {
            console.log("Appwrite Error :: getPosts Error ::" ,error )
            return false
        }

    }

    // file upload 

    async uploadFile(file,fileId){
        if (!file || !(file instanceof File)) {
            console.error("Invalid file provided. Please ensure it's a valid File object.");
            return false;
          }
        try {
            return await this.storage.createFile(conf.appwriteBucketId,fileId ||ID.unique,file)
        } catch (error) {
            
            console.error("Appwrite Error :: uploadFile Error ::", {
                message: error?.message,
                code: error?.code,
                response: error?.response,
              });
            return false
        }
    }
    
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(conf.appwriteBucketId,fileId)
            return true
        } catch (error) {
            console.log("Appwrite Error :: deleteFile Error ::" ,error )
            return false
        }
    }

    getFilePreview(fileId){
        try {
            
            return this.storage.getFilePreview(conf.appwriteBucketId,fileId)
             
            
        } catch (error) {
            console.log("Appwrite Error :: getFilePreview  Error ::" ,error )
            return false
        }
    }
    
}

const service = new Service;

 export default service;