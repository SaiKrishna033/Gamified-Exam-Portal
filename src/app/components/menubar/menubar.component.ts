import { Component } from '@angular/core';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { KuheduLoginComponent } from '../kuhedu-login/kuhedu-login.component';
import { KuhedSignupComponent } from '../kuhed-signup/kuhed-signup.component';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent {
  faSignIn = faSignIn;
  modalOpen = false;
  isLogin = false;
  isRegister = false;
  logOut = false;
  forgetpassword = false;
  userName:any = ''
disablemenu = false;
  constructor(private security : EncryptionService,private router: Router,
    private activateRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      // Get the current route URL after navigation is complete
      const currentRoute = this.router.url;

      if(currentRoute=='/kuhu-pin'){
        this.disablemenu=true
      }
      else{
        this.disablemenu=false
      }
      console.log('Current Route:', currentRoute);
    });

    if (localStorage.getItem('id')) {
      this.logOut = true;
      this.userName = this.security.decryptData(String(localStorage.getItem('firstName')));
    }
  }
  
  logout() {
    localStorage.clear();
    window.location.reload();
  }
  closeModal() {
    this.modalOpen = false;
    this.isLogin = false;
    this.isRegister = false;
    this.forgetpassword = false;
  }

  openLogin() {
    this.modalOpen = true;
    this.isLogin = true;
    this.isRegister = false;
  }
  openRegister() {
    this.modalOpen = true;
    this.isRegister = true;
    this.isLogin = false;
  }
  switchToRegister(event:any) {
    if(event=='forgetpassword')
    { this.isLogin = false;
      this.isRegister = false;
      this.forgetpassword = true;

    }
    else{
      this.isLogin = false;
      this.isRegister = true;
    }
   
  }
  switchToLogin(event:any) {
    if(event=='forgetpassword')
    {
      this.isLogin = false;
      this.isRegister = false;
      this.forgetpassword = true;
    }
    else{
      this.isLogin = true;
      this.isRegister = false;
    }
   
  }
}
