import { Component } from '@angular/core';
import {faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  faYoutube = faYoutube;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faWhatsapp = faWhatsapp;

  constructor(private router: Router, private userService: UserService) {}
  //  LOGIN THINGS

  routeToRegistration() {
    const currentUser = this.userService.getUserType();

    if (currentUser === 'teacher') {
      this.router.navigate(['/teacher-registration']);
    } else if (currentUser === 'student') {
      this.router.navigate(['/student-registration']);
    }
  }

  routeto() {
    const currentUser = this.userService.getUserType();

    if (currentUser === 'teacher') {
      console.log('Routing to teacher place ');
      // sleep 2 seconds
      setTimeout(() => {
        this.router.navigate(['/teacher-dashboard']);
      }, 2000);
    } else if (currentUser === 'student') {
      this.router.navigate(['/kuhu-pin']);
    }
  }

  ngOnInit() {
    if (localStorage.getItem('id')) {
      console.log('User is logged in');
      this.routeto();
    } else {
      return
    }
  }
}
