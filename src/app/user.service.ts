import { Injectable } from "@angular/core";
import { EncryptionService } from './shared/services/encryption.service';
import { Inject } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    @Inject(EncryptionService) private keySvc: EncryptionService
  ) {}
  getUserType(): string | null {
    // Logic to fetch user type from local storage or API
    // Return null if user type is not available or not authenticated
    return this.keySvc.decryptData(localStorage.getItem('userType') as string);
  }
  getAccessToken(): string | null {
    // Logic to fetch access token from local storage or API
    // Return null if access token is not available or not authenticated
    return this.keySvc.decryptData(localStorage.getItem('accessToken') as string);
  }
}
