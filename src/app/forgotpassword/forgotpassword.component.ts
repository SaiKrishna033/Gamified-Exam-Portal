import { Component } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  clickedSendOtp: boolean = false;
  clickedSubmitOtp: boolean = false;
  intial: boolean = true;
  sendotp(){
    this.clickedSendOtp = true;
    this.intial = false;
  }

  handleOtpSubmit(){
    this.clickedSubmitOtp =true;
    this.clickedSendOtp = false;
  }


  
}
