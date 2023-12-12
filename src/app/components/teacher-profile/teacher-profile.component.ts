import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
})

export class TeacherProfileComponent {
  constructor(
    private http: HttpClient,
    private khservice: KuheduServiceService,
    private toast: NgToastService,
    private router: Router
  ) {}

  [x: string]: any;
  teacherName: string = '';
  teacherLivingCity: string = '';
  teacherContactNumber: string = '';
  teacherEmail: string = '';
  role: string = '';
  school_private_insititute_interested: string = '';
  school_private_insititute_name: string = '';
  intrestedSchoolCity: string = ''; // city
  specific_question: string = '';

  highlightedButtons: { [key: string]: boolean } = {};
  highlightedButtons2: { [key: string]: boolean } = {};
  // ["school_teacher","admin","principal","owner","private_tutor","staff","hod","other",]
  roleButton: string[][] = [
    ['school_teacher', 'admin'],
    ['principal', 'owner'],
    ['private_tutor', 'staff'],
    ['hod', 'other'],
  ];

  roleButtonHumanReadable: string[][] = [
    ['School Teacher', 'Admin'],
    ['Principal', 'Owner'],
    ['Private Tutor', 'Staff'],
    ['HOD', 'Other'],
  ];

  schoolTypeButton: string[] = ['school', 'private_institute'];

  role1DArray: string[] = this.roleButton.reduce(
    (acc, val) => acc.concat(val),
    []
  );
  roleHumanReadable1DArray: string[] = this.roleButtonHumanReadable.reduce(
    (acc, val) => acc.concat(val),
    []
  );

  isHighlighted(buttonId: string) {
    return this.highlightedButtons[buttonId];
  }

  isHighlighted2(buttonId: string) {
    return this.highlightedButtons2[buttonId];
  }

  handleRoleButton(value: string) {
    // console.log(value);
    this.role = value;
  }

  toggleHighlight(buttonId: string) {
    this.highlightedButtons[buttonId] = !this.highlightedButtons[buttonId];

    // remove highlight from other buttons
    this.roleButtonHumanReadable.forEach((row) => {
      row.forEach((id) => {
        if (id !== buttonId) {
          this.highlightedButtons[id] = false;
        }
      });
    });

    // set role
    this.handleRoleButton(
      this.role1DArray[this.roleHumanReadable1DArray.indexOf(buttonId)]
    );
  }

  toggleHighlight2(buttonId: string) {
    this.highlightedButtons2[buttonId] = !this.highlightedButtons2[buttonId];

    // remove highlight from other buttons
    this.schoolTypeButton.forEach((id) => {
      if (id !== buttonId) {
        this.highlightedButtons2[id] = false;
      }
    });

    // set role
    this.handleSchoolTypeButton(buttonId);
  }

  handleSchoolTypeButton(value: string) {
    console.log(value);
    this.school_private_insititute_interested = value;
  }

  // validate
  validate() {
    if (
      this.teacherName === ''
      || this.teacherLivingCity === ''
      || this.teacherContactNumber === ''
      || this.teacherEmail === ''
      || this.role === ''
      || this.school_private_insititute_interested === ''
      || this.school_private_insititute_name === ''
      || this.intrestedSchoolCity === ''
      || this.specific_question === ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  // validate email
  validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validateForApi() {
    /*
     * Contains validation to satisfy API requirements
     * 1. School name must be at least 10 characters long
     * 2. Specific question must be at least 10 characters long
     * 3. Phone number must be 10 digits long
    */
    if (this.validateEmail(this.teacherEmail) === false) {
      this.toast.warning({
        detail: 'INFO',
        summary: 'Please enter a valid email',
        duration: 3000,
        position: 'topRight',
      });

      return false;
    }

    // "school_private_insititute_name length must be at least 10 characters long",
    if (this.school_private_insititute_name.length < 10) {
      this.toast.warning({
        detail: 'INFO',
        summary: 'Please enter a valid school name',
        duration: 3000,
        position: 'topRight',
      });

      return false;
    }

    // "specific_question length must be at least 10 characters long"
    if (this.specific_question.length < 10) {
      this.toast.warning({
        detail: 'INFO',
        summary: 'Please enter a valid question',
        duration: 3000,
        position: 'topRight',
      });

      return false;
    }

    // "phone_number length must be 10 characters long"
    if (this.teacherContactNumber.length !== 10) {
      this.toast.warning({
        detail: 'INFO',
        summary: 'Please enter a valid phone number (Should be 10 digits long)',
        duration: 3000,
        position: 'topRight',
      });

      return false;
    }

    return true;

  }

  // API REQUEST SEC
  handleSubmit() {
    if (this.validate() === false) {
      this.toast.warning({
        detail: 'INFO',
        summary: 'Please fill all the fields',
        duration: 3000,
        position: 'topRight',
      });

      return;
    }

    if (this.validateForApi() === false) {
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    const body = {
      phone_number: this.teacherContactNumber,
      role: this.role,
      school_private_insititute_interested:
        this.school_private_insititute_interested,
      school_private_insititute_name: this.school_private_insititute_name,
      city: this.intrestedSchoolCity,
      specific_question: this.specific_question,
    };

    this.http
      .post(this.khservice.baseUrl + 'user/set-teacher-profile', body, {
        headers,
      })
      .subscribe(
        (data: any) => {
          this.toast.success({
            detail: 'INFO',
            summary: 'Successfully submitted',
            duration: 3000,
            position: 'topRight',
          });
          this.router.navigate(['/']);
        },
        (error) => {

          const errors = error.error.errors;
          // combine all errors into a single string
          let toastMessage = '';
          Object.keys(errors).forEach((key) => {
            toastMessage += errors[key] + '\n';
          });


          console.error('Error:', errors);
          console.log('Toast message:', toastMessage);
          this.toast.warning({
            detail: 'INFO',
            summary: 'Something went wrong: ' + toastMessage,
            duration: 3000,
            position: 'topRight',
          });
        }
      );

    // TODO: HANDLE ROUTE TO NEXT
  }
}
