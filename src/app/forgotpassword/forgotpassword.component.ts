import { Component, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  clickedSendOtp: boolean = false;
  clickedSubmitOtp: boolean = false;
  intial: boolean = true;

  constructor(
    private http: HttpClient,
    private khservice: KuheduServiceService,
    private toast: NgToastService,
    private router: Router
  ) { console.log("LOG: Forgot pass init") }
  
  // POST OTP
  userEmail: string = '';
  sendotp() {
    if(this.userEmail==''){
      this.toast.warning({
        detail: 'warning',
        summary: 'Enter your email address',
        duration: 3000,
        position: 'topRight',
      });
      return
    }

    const ENDPOINT ="user/request-reset-password"
    const body = {
      email: this.userEmail
    }

    this.http.post(this.khservice.baseUrl + ENDPOINT, body).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.clickedSendOtp = true;
          this.intial = false;
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Successfully Requested OTP',
            duration: 3000,
            position: 'topRight',

          });
        }
      }, (error) => {
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
    )
  }

  emailOtp: any;
  handleOtpSubmit() {
    this.clickedSubmitOtp = true;
    this.clickedSendOtp = false;
  }


  // varibale
  email: string = '';
  pass1: string = '';
  pass2: string = '';
  final_password: string = '';

  validate() {

    // empty check
    if (this.pass1 == '' || this.pass2 == '') {
      this.toast.info({
        detail: 'INFO',
        summary: 'Password feilds cannot be empty',
        duration: 3000,
        position: 'topRight',
      });
      return false;
    }

    // match check
    if (this.pass1 != this.pass2) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Password does not match',
        duration: 3000,
        position: 'topRight',
      });
      return false;
    }

    this.final_password = this.pass1 + this.pass2;
    return true;
  }

  handlePasswordChangeSubmit() {
    this.validate();

    const ENDPOINT = "user/reset-password"
    const body = {
      email: this.userEmail,
      code: this.emailOtp,
      password: this.final_password
    }

    this.http.post(this.khservice.baseUrl + ENDPOINT, body).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Successfully Changed Password, Try Logging in again',
            duration: 3000,
            position: 'topRight',
          });
          this.router.navigate(['/home']);
        }
      }, (error) => {
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
    )
  }

}
