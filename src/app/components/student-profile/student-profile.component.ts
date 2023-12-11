import { Component, ViewChild, ElementRef } from '@angular/core';

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
    
  }
  
  constructor() { }

}
