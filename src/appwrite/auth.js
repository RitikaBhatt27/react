import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // To create account we created below method--

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // To create login functionality --
  async login() {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // To check if the user is already logged in or not --
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  // To logout the currently logged in user --
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
