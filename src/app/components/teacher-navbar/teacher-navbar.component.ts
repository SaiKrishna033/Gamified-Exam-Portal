import { Component } from '@angular/core';
import { EncryptionService } from 'src/app/shared/services/encryption.service';

@Component({
  selector: 'app-teacher-navbar',
  templateUrl: './teacher-navbar.component.html',
  styleUrls: ['./teacher-navbar.component.scss'],
})
export class TeacherNavbarComponent {
  constructor(private keySvc: EncryptionService) {}

  firstname: any;
  lastname: any;
  username: any;

  ngOnInit(): void {
    this.firstname = this.keySvc.decryptData(localStorage.getItem('firstName') ?? '');
    this.lastname = this.keySvc.decryptData(localStorage.getItem('lastName') ?? '');
    this.username = this.firstname + " " + this.lastname;
    console.log(this.firstname);
  }
}
