import { Avatars, Client } from "appwrite";

export class AvatarsService {
  client = new Client();
  avatars;

  constructor() {
    this.client.setEndpoint(import.meta.env.VITE_AW_PROJECT_ENDPOINT).setProject(import.meta.env.VITE_AW_PROJECT_ID);
    this.avatars = new Avatars(this.client);
  }
}

export const avatars = new AvatarsService();
