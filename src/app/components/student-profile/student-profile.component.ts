import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent {
  studentName: string = '';
  phoneNumeber: string = '';
  classNumber: number = 0;
  board: string = '';
  institute: string = '';
  highlightedButtons: { [key: string]: boolean } = {};

  buttonIds: string[] = ['class6', 'class7', 'class8', 'class9', 'class10', 'class11', 'class12'];
  buttonValues: number[] = [6, 7, 8, 9, 10, 11, 12];

  boardButtonIds: string[] = ['cbse', 'icse', 'others'];
  boardButtonValues: string[] = ['CBSE', 'ICSE', 'Others'];

  isHighlighted(buttonId: string): boolean {
    // console.log(this.highlightedButtons[buttonId]);
    return this.highlightedButtons[buttonId];
  }

  handleClassButton(value: number) {
    this.classNumber = value;
  }

  handleBoardButton(value: string) {
    this.board = value;
  }

  toggleHighlight(buttonId: string): void {
    this.highlightedButtons[buttonId] = !this.highlightedButtons[buttonId];
    // remove highlight from other buttons
    this.buttonIds.forEach((id) => {
      if (id !== buttonId) {
        this.highlightedButtons[id] = false;
      }
    });

    // set class number
    this.handleClassButton(this.buttonValues[this.buttonIds.indexOf(buttonId)]);
    // console.log(this.classNumber);
  }

  isBoardHighlighted(buttonId: string): boolean {
    return this.highlightedButtons[buttonId];
  }

  toggleBoardHighlight(buttonId: string): void {
    this.highlightedButtons[buttonId] = !this.highlightedButtons[buttonId];
    // remove highlight from other buttons
    this.boardButtonIds.forEach((id) => {
      if (id !== buttonId) {
        this.highlightedButtons[id] = false;
      }
    });

    // set board
    this.handleBoardButton(this.boardButtonValues[this.boardButtonIds.indexOf(buttonId)]);
    // console.log(this.board);
  }

  validation() {
    if (!this.studentName) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Please enter your name',
        duration: 3000,
        position: 'topRight',
      });
      return false;

    } else if (!this.phoneNumeber) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Please enter your phone number',
        duration: 3000,
        position: 'topRight',
      });
      return false;

    } else if (!this.classNumber) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Please select your class',
        duration: 3000,
        position: 'topRight',
      });
      return false;
    } else if (!this.board) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Please select your board',
        duration: 3000,
        position: 'topRight',
      });
      return false;

    } else if (!this.institute) {
      this.toast.info({
        detail: 'INFO',
        summary: 'Please enter your institute name',
        duration: 3000,
        position: 'topRight',
      });

      return false;
    }
    
    return true;
  }

  constructor(
    private http: HttpClient,
    private khservice: KuheduServiceService,
    private toast: NgToastService,
    private router: Router
  ) { }

  handleSubmit() {

    if (!this.validation()) {
      return;
    }

    const ENDPOINT = "user/set-student-profile"
    const body = {
      // name: this.studentName, // TODO: add name field in the backend
      phone_number: this.phoneNumeber,
      class: this.classNumber,
      board: this.board,
      institute_name: this.institute
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });

    this.http.post(this.khservice.baseUrl + ENDPOINT, body, { headers }).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Successfully Registered',
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
  
}
