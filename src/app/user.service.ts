import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserType(): string | null {
    // Logic to fetch user type from local storage or API
    // Return null if user type is not available or not authenticated
    return localStorage.getItem('userType');
  }
}
