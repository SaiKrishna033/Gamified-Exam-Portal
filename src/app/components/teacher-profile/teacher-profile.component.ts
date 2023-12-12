import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent {
[x: string]: any;
  teacherName: string = '';
  teacherLivingCity: string = '';
  teacherContactNumber: string = '';
  teacherEmail: string = '';
  role: string = '';
  intrestedSchool: string = '';
  intrestedSchoolLocation: string = '';
  question: string = '';

  highlightedButtons: { [key: string]: boolean } = {};
  // ["school_teacher","admin","principal","owner","private_tutor","staff","hod","other",]
  roleButton: string[][] = [
    ['school_teacher', 'admin'],
    ["principal", "owner"],
    ["private_tutor", "staff"],
    ["hod", "other"],
  ];

  roleButtonHumanReadable: string[][] = [
    ['School Teacher', 'Admin'],
    ["Principal", "Owner"],
    ["Private Tutor", "Staff"],
    ["HOD", "Other"],
  ];

  role1DArray: string[] = this.roleButton.reduce((acc, val) => acc.concat(val), []);
  roleHumanReadable1DArray: string[] = this.roleButtonHumanReadable.reduce((acc, val) => acc.concat(val), []);

  isHighlighted(buttonId: string) {
    return this.highlightedButtons[buttonId];
  }
  handleRoleButton(value: string) {
    console.log(value);
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
    this.handleRoleButton(this.role1DArray[this.roleHumanReadable1DArray.indexOf(buttonId)])
  }
}
