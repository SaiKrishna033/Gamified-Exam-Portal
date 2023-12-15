import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kuhed-signup',
  templateUrl: './kuhed-signup.component.html',
  styleUrls: ['./kuhed-signup.component.scss'],
})
export class KuhedSignupComponent {
  @Output() navigateToLogin: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient,
    private khservice: KuheduServiceService,
    private toast: NgToastService,
    private router: Router
  ) {}
  handleEmit() {
    console.log('emited');
    this.navigateToLogin.emit('login');
  }
  handleForgetEmit()
  {
  this.navigateToLogin.emit('forgetpassword')
  }
  id: any;
  signUp: boolean = false;
  handleSubmit(form: any) {
    this.http
      .post(this.khservice.baseUrl + 'user/register', form.value)
      .subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.id = res.data.id;
            localStorage.setItem('regId', this.id);
            this.signUp = true;
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Successfully Registered',
              duration: 3000,
              position: 'topRight',
            });
          }
        },
        (error) => {
          console.error('Registration failed:', error);

          // Assuming that the error response from the server contains a message
          const errorMessage = error.error
            ? error.error.message
            : 'Unknown error';

          this.toast.info({
            detail: 'INFO',
            summary: 'Registration Failed due to ' + errorMessage,
            duration: 3000,
            position: 'topRight',
          });
        }
      );
  }

  handleVerification(form: any) {
    this.http
      .get(
        this.khservice.baseUrl +
          'user/verify-email/' +
          this.id +
          '/' +
          form.code
      )
      .subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.id = res.data.id;
            localStorage.setItem('regId', this.id);
            this.signUp = true;
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Verification Successful, you can login now.',
              duration: 3000,
              position: 'topRight',
            });
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          console.error('Verification failed:', error);

          // Assuming that the error response from the server contains a message
          const errorMessage = error.error
            ? error.error.message
            : 'Unknown error';

          this.toast.info({
            detail: 'INFO',
            summary: 'Verification Failed ' + errorMessage,
            duration: 3000,
            position: 'topRight',
          });
        }
      );
  }
}
