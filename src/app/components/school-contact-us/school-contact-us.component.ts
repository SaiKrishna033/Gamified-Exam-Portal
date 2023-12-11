// Import necessary modules and components
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-school-contact-us',
  templateUrl: './school-contact-us.component.html',
  styleUrls: ['./school-contact-us.component.scss'],
})
export class SchoolContactUsComponent {
  // Declare class variables
  email: any;
  school_name: any;
  mobile: any;
  full_name: any;
  type: any;
  comment: any;

  constructor(private route: Router, private http: HttpClient,private service:KuheduServiceService,private toast:NgToastService) {}

  /**
   * Function to validate the email format
   * @param email Email string to be validated
   * @returns Boolean value indicating whether the email format is valid
   */
  validateEmail(email: string) {
    // Email validation regular expression
    const emailRegex = /^\S+@\S+\.\S+$/;
    return email.match(emailRegex) ? true : false;
  }


  validateMobile(mobile: string) {
    // Mobile number validation regular expression
    const mobileRegex = /^\d{10}$/;
    return mobile.match(mobileRegex) ? true : false;
  }


  submit() {
    // Declare a variable for response data


    // Perform form field validations
    if(!this.email && !this.school_name && !this.type && !this.full_name && !this.mobile)
    {
      this.toast.info({
        detail: 'INFO',
        summary: "Please enter all the required detail's",
        duration: 3000,
        position: 'topRight',
      });
    }
    else if (!this.email || (this.email && !this.validateEmail(this.email))) {

      this.toast.info({
        detail: 'INFO',
        summary: 'Please enter a valid email address',

        duration: 3000,
        position: 'topRight',
      });
    } else if (!this.full_name) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Please enter your full name',

        duration: 3000,
        position: 'topRight',
      });
    } else if (!this.mobile || (this.mobile && !this.validateMobile(this.mobile))) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Please enter a valid 10-digit mobile number',

        duration: 3000,
        position: 'topRight',
      });
    } else if (!this.type) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Please select your type of category',
        duration: 3000,
        position: 'topRight',
      });
    } else if (!this.school_name) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Please enter your school name',

        duration: 3000,
        position: 'topRight',
      });
    } else {
      this.sendDataToBackend();
    }
  }

  /*
   * Function to send data to the backend API
   */
  sendDataToBackend() {
    const data = {
      email: this.email,
      school_name: this.school_name,
      mobile: this.mobile,
      full_name: this.full_name,
      type: this.type,
      comment: this.comment,
    };

    // Make a POST request to the backend API
    this.http.post(this.service.baseUrl + 'enquiry/create',data).subscribe((res:any)=>{
      console.log(res.status)
      if(res?.status==200)
      {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Thanks for contacting Kuhedu!',

          duration: 3000,
          position: 'topRight',
        });
        this.email=''
        this.full_name=''
        this.school_name=''
        this.mobile=''
        this.type=''
        this.comment=null
      }
      else{
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something Went Wrong! Please try again later',

          duration:3000,
          position: 'topRight',
        });
      }
    });
  }
}
