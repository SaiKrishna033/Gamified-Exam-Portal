import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss']
})
export class TeacherProfileComponent {
  teacherName: string = '';
  teacherLivingCity: string = '';
  teacherContactNumber: string = '';
  teacherEmail: string = '';

  intrestedSchool: string = '';
  intrestedSchoolLocation: string = '';

  question: string = '';
}
