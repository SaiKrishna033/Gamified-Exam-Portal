// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedUserTypes = route.data['allowedUserTypes'] as string[];
    const userType = this.userService.getUserType();

    if (userType && allowedUserTypes.includes(userType)) {
      console.log('Route Gaurd acted True: ' + userType);
      // User has access
      return true;
    } else {
      // Redirect to a different route for unauthorized users
      console.log("Route Gaurd acted: " + userType)
      this.router.navigate(['/home']);
      return false;
    }
  }
}
