import { Client, Account, ID } from 'appwrite'
import conf from '../conf/conf.js';
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)


    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            console.log("CreateAccount Error :: auth Error :: ", error)
        }

    }
    async login({ email, password }) {
        try {
            return this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Login Error :: auth Error :: ", error)
        }

    }
    async isLoggedIn(){
        try {
            const user= this.account.getSession()
            return !!user
            
        } catch (error) {
            console.log("isLoggedIn Error :: auth Error :: ", error)
            return false
        }

    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            
            console.log("getCurrentUser Error :: auth Error :: ", error)
            
        }

        
    }

    async logout() {
        try {
            return await this.account.deleteSessions()

        } catch (error) {
            console.log("Logout Error :: auth Error :: ", error)
        }
    }
}
const authService = new AuthService();
export default authService; 
