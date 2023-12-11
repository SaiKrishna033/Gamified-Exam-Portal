import { Component } from '@angular/core';
import {faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faYoutube=faYoutube;
  faFacebook=faFacebook;
  faInstagram=faInstagram;
  faTwitter=faTwitter;
  faLinkedin=faLinkedin;
  faWhatsapp=faWhatsapp;
}
