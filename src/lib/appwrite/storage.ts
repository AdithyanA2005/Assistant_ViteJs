import { Client, ID, ImageGravity, Permission, Role, Storage } from "appwrite";
import { auth } from "@/lib/appwrite/auth";

// PROFILE PHOTO
interface CreateProfilePhotoParams {
  file: File;
}

interface GetProfilePhotoUrlParams {
  photoId: string;
}

interface DeleteProfilePhotoParams {
  photoId: string;
}

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(import.meta.env.VITE_AW_PROJECT_ENDPOINT).setProject(import.meta.env.VITE_AW_PROJECT_ID);
    this.storage = new Storage(this.client);
  }

  async _getUDPermissions() {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error("No user is authenticated to perform action");

    return [Permission.delete(Role.user(user.$id)), Permission.update(Role.user(user.$id))];
  }

  // PROFILE PHOTO
  async createProfilePhoto({ file }: CreateProfilePhotoParams): Promise<string> {
    try {
      const permissions = await this._getUDPermissions();
      const photo = await this.storage.createFile(
        import.meta.env.VITE_AW_PROFILE_PHOTO_STORAGE_ID,
        ID.unique(),
        file,
        permissions,
      );
      return photo.$id;
    } catch (error) {
      console.error("Appwrite :: createProfilePhoto() :: ", error);
      throw error;
    }
  }

  async deleteProfilePhoto({ photoId }: DeleteProfilePhotoParams): Promise<void> {
    try {
      await this.storage.deleteFile(import.meta.env.VITE_AW_PROFILE_PHOTO_STORAGE_ID, photoId);
    } catch (error) {
      console.error("Appwrite :: deleteProfilePhoto() :: ", error);
      throw error;
    }
  }

  getProfilePhotoUrl({ photoId }: GetProfilePhotoUrlParams): string {
    try {
      const url: URL = this.storage.getFilePreview(
        import.meta.env.VITE_AW_PROFILE_PHOTO_STORAGE_ID,
        photoId,
        2000,
        2000,
        ImageGravity.Top,
        100,
      );
      return url.toString();
    } catch (error) {
      console.error("Appwrite :: getProfilePhotoUrl() :: ", error);
      throw error;
    }
  }
}

export const storage = new StorageService();
