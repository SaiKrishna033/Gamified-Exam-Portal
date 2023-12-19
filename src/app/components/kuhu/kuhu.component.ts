import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ClockComponent } from '../clock/clock.component';
import { EncryptionService } from '../../shared/services/encryption.service';
import { KuhuItemStateObj } from '../../shared/models/kuhu-item-state';
import { _kuhuItem } from '../../shared/models/kuhu-item';

import { faClock, faLightbulb, faHandPointUp, faArrowAltCircleLeft, faArrowAltCircleRight, faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { ActivatedRoute } from '@angular/router';

interface studentResponse {
  question_number: number;
  isChosen: boolean;
  isCorrect: boolean;
  chosenOption: number;
  isTimeElapsed: boolean;
  responseTimeInSeconds: number;
}

@Component({
  selector: 'app-kuhu',
  templateUrl: './kuhu.component.html',
  styleUrls: ['./kuhu.component.scss'],
})
export class KuhuComponent {
  constructor(
    private keySvc: EncryptionService,
    private http: HttpClient,
    private dialog: MatDialog,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private kuheduService: KuheduServiceService,
    private route: ActivatedRoute
  ) {}

  //variable declarations
  _faClock = faClock;
  _faLightbulb = faLightbulb;
  _faHandPointUp = faHandPointUp;
  _faArrowAltCircleLeft = faArrowAltCircleLeft;
  _faArrowAltCircleRight = faArrowAltCircleRight;
  _faCheckCircle = faCheckCircle;
  _faXmarkCircle = faXmarkCircle;

  // _answerDiv1!:ElementRef;
  // _answerDiv2!:ElementRef;
  // _answerDiv3!:ElementRef;
  // _answerDiv4!:ElementRef;

  startHover: boolean = false;
  _kuhustate: KuhuItemStateObj = {};

  _kuhuItem_!: _kuhuItem;
  questions: any = [];

  apiObj: any = {};
  kuhu_state: any = [];

  accessToken: string = '';
  _accessToken: string = '';
  _filename: string = '';

  totalTimeInSeconds: number = 0;
  timeRemaining = 0;
  totalTimeInSeconds_item: number = 0;
  timeRemaining_item = 0;
  kuhuObj: any;
  question_no: number = 1;
  total_questions: number = 0;
  subject: string = '';
  topic: string = '';
  difficulty_level: string = '';

  // dataHandler
  dataHandlerObj: dataHandler | undefined;

  //execute on component init
  ngOnInit(): void {
    var pin = this.route.snapshot.params['pin'];
    console.log(pin);
    this.accessToken = localStorage.getItem('kuhuToken') as string;
    this._accessToken = this.keySvc.decryptData(this.accessToken);
    this._filename = this._accessToken + '.json';

    const headers = new HttpHeaders({
      'frontend-header': '5403e66a-b2e7-49a7-b052-d762a3cfb8b3',
    });
    if (pin) {
      this.http
        .get<_kuhuItem>(
          this.kuheduService.baseUrl +
            'question/get-all-questions-using-pin?pin=' +
            pin,
          { headers }
        )

        .subscribe((apidata) => {
          console.log(apidata);
          this._kuhuItem_ = apidata;
          this.kuheduService.DashbaordData.next(apidata);

          console.log(this._kuhuItem_.data.item);
          this.totalTimeInSeconds =
            this._kuhuItem_.data.item.duration_in_seconds;
          this.timeRemaining = this.totalTimeInSeconds;
          this.totalTimeInSeconds_item =
            this._kuhuItem_.data.item.duration_in_seconds_per_item;
          this.timeRemaining_item = this.totalTimeInSeconds_item;
          this.kuhuObj = this._kuhuItem_.data.item;
          this.total_questions = this._kuhuItem_.data.item.total_questions;
          this.subject = this._kuhuItem_.data.item.subject;
          this.topic = this._kuhuItem_.data.item.topic;
          this.difficulty_level = this._kuhuItem_.data.item.difficulty_level;
          this.questions = this._kuhuItem_.data.item.questions;

          for (var i = 0; i < this.total_questions; i++) {
            this._kuhustate = KuhuItemStateObj.create({
              question_number: i + 1,
              isChosen: false,
              isCorrect: false,
              chosenOption: 0,
              isTimeElapsed: false,
              responseTimeInSeconds: 0,
              remainingTimeInSeconds: 0,
              option1_state: '',
              option2_state: '',
              option3_state: '',
              option4_state: '',
            });
            this.kuhu_state.push(this._kuhustate);
          }

          this.dataHandlerObj = new dataHandler(
            this.totalTimeInSeconds,
            this.total_questions
          );
        });
    }
  }

  //set initial state
  showState = true; //for switching between kuhu-item and problem data capture
  showPrev = false; //prev button's visibility state
  showNext = false; //next button's visibility state
  showSubmit = false; //show submit button's visibility state
  showPlay = true; //button's visibility state
  showPauseResume = false; //true=pause, false=resume
  resumepauseText = 'Pause'; //link text
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  //User actions
  startTime: string = "";
  startPlay() {
    this.showPlay = false;
    this.showPrev = false;
    this.showNext = true;
    this.startHover = true;

    // start time in AM/PM format
    this.startTime = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    this.startClock();
  }

  pausePlay() {
    this.resumepauseText === 'Pause'
      ? (this.stopClock(),
        (this.startHover = false),
        (this.showPrev = false),
        (this.showNext = false))
      : (this.startClock(),
        (this.startHover = true),
        this.question_no == 1
          ? (this.showPrev = false)
          : (this.showPrev = true),
        this.question_no == this.total_questions
          ? (this.showNext = false)
          : (this.showNext = true));

    this.resumepauseText =
      this.resumepauseText === 'Pause' ? 'Resume' : 'Pause';
  }

  submitClick() {
    /**
     * Total number of questions
        Average Time spend per question
        Not Attempted
        Correct Answers
        Incorrect Answers
        Total Time taken
     *
     */

    const pincode = this.route.snapshot.params['pin'];
    const totalQuestions = this.total_questions;
    const averageTime = this.dataHandlerObj?.getAverageTime();
    const notAttempted = this.dataHandlerObj?.getNumberOfUnattempted();
    const correctAnswers = this.dataHandlerObj?.getCorrectAnswers();
    const incorrectAnswers = this.dataHandlerObj?.getIncorrectAnswers();
    const totalTimeTaken = this.dataHandlerObj?.getTimetaken();
    const startTime = this.startTime;
    const endTime = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const data = {
      totalQuestions,
      averageTime,
      notAttempted,
      correctAnswers,
      incorrectAnswers,
      totalTimeTaken,
      startTime,
      endTime,
      pincode
    }

    console.log(data);
    this.router.navigate(['/kuhu-quiz-dashboard'], {state: {data: data}});
  }

  nextClick() {
    this.startHover = true;
    this.question_no =
      this.question_no < this.total_questions
        ? this.question_no + 1
        : this.question_no;
    if (this.total_questions == this.question_no) {
      this.showSubmit = true;
    } else {
      this.showSubmit = false;
    }
    // this.kuhu_state[this.question_no - 1].isChosen ? this.startHover = false : this.startHover = true;
    this.question_no == this.total_questions
      ? (this.showNext = false)
      : (this.showNext = true);
    this.showPrev = true;
  }

  prevClick() {
    this.question_no =
      this.question_no > 1 ? this.question_no - 1 : this.question_no;
    if (this.total_questions == this.question_no) {
      this.showSubmit = true;
    } else {
      this.showSubmit = false;
    }
    this.kuhu_state[this.question_no - 1].isChosen
      ? (this.startHover = false)
      : (this.startHover = true);
    this.question_no == 1 ? (this.showPrev = false) : (this.showPrev = true);
    this.showNext = true;
  }

  chosen(item: number) {
    if (!this.showPlay) {
      if (
        !this.kuhu_state[this.question_no - 1].isChosen &&
        this.resumepauseText == 'Pause'
      ) {
        this.startHover = false;
        this.kuhu_state[this.question_no - 1].isChosen = true;
        this.kuhu_state[this.question_no - 1].chosenOption = item;
        this.kuhu_state[this.question_no - 1].iscorrect = this.kuhuObj
          .questions[this.question_no - 1].answers[item - 1].isCorrect
          ? true
          : false;

        const elapSedTime = this.clock_item.getElapsedTimeInSeconds();
        console.log('Elapsed Time (Item):' + elapSedTime);

        // TODO: move the data assigning to NextClick() when its fixed
        const data: studentResponse = {
          question_number: this.question_no,
          isChosen: true,
          isCorrect: this.kuhuObj.questions[this.question_no - 1].answers[item - 1].isCorrect,
          chosenOption: item,
          isTimeElapsed: elapSedTime >= this.totalTimeInSeconds_item, // TODO: verify the logic
          responseTimeInSeconds: elapSedTime,
        };
        this.dataHandlerObj?.addData(data);

        this.clock_item.restartTimer();

        if (item - 1 == 0) {
          this.kuhu_state[this.question_no - 1].option1_state = this.kuhuObj
            .questions[this.question_no - 1].answers[0].isCorrect
            ? '1'
            : '0';
          this.kuhu_state[this.question_no - 1].option2_state = this.kuhuObj
            .questions[this.question_no - 1].answers[1].isCorrect
            ? '1'
            : '';
          this.kuhu_state[this.question_no - 1].option3_state = this.kuhuObj
            .questions[this.question_no - 1].answers[2].isCorrect
            ? '1'
            : '';
          this.kuhu_state[this.question_no - 1].option4_state = this.kuhuObj
            .questions[this.question_no - 1].answers[3].isCorrect
            ? '1'
            : '';
        }
        if (item - 1 == 1) {
          this.kuhu_state[this.question_no - 1].option1_state = this.kuhuObj
            .questions[this.question_no - 1].answers[0].isCorrect
            ? '1'
            : '';
          this.kuhu_state[this.question_no - 1].option2_state = this.kuhuObj
            .questions[this.question_no - 1].answers[1].isCorrect
            ? '1'
            : '0';
          this.kuhu_state[this.question_no - 1].option3_state = this.kuhuObj
            .questions[this.question_no - 1].answers[2].isCorrect
            ? '1'
            : '';
          this.kuhu_state[this.question_no - 1].option4_state = this.kuhuObj
            .questions[this.question_no - 1].answers[3].isCorrect
            ? '1'
            : '';
        }
        if (item - 1 == 2) {
          this.kuhu_state[this.question_no - 1].option1_state = this.kuhuObj
            .questions[this.question_no - 1].answers[0].isCorrect
            ? '1'
            : '';
          this.kuhu_state[this.question_no - 1].option2_state = this.kuhuObj
            .questions[this.question_no - 1].answers[1].isCorrect
            ? '1'
            : '';
          this.kuhu_state[this.question_no - 1].option3_state = this.kuhuObj
            .questions[this.question_no - 1].answers[2].isCorrect
            ? '1'
            : '0';
          this.kuhu_state[this.question_no - 1].option4_state = this.kuhuObj
            .questions[this.question_no - 1].answers[3].isCorrect
            ? '1'
            : '';
        }
        if (item - 1 == 3) {
          this.kuhu_state[this.question_no - 1].option1_state = this.kuhuObj
            .questions[this.question_no - 1].answers[0].isCorrect
            ? '1'
            : '';
          this.kuhu_state[this.question_no - 1].option2_state = this.kuhuObj
            .questions[this.question_no - 1].answers[1].isCorrect
            ? '1'
            : '';
          this.kuhu_state[this.question_no - 1].option3_state = this.kuhuObj
            .questions[this.question_no - 1].answers[2].isCorrect
            ? '1'
            : '';
          this.kuhu_state[this.question_no - 1].option4_state = this.kuhuObj
            .questions[this.question_no - 1].answers[3].isCorrect
            ? '1'
            : '0';
        }
        //console.log(this.kuhu_state);
        this.startHover = true;
        //  this.nextClick();
        setTimeout(() => {
          console.log(this.startHover);
          this.nextref.nativeElement.click();
        }, 1000);
      }
    }
  }

  changeState(position: any) {
    this.showState = this.showState === true ? false : true;
    console.log(this.showState);
    if (position == 'issue') {
      this.stopClock();
    }
    if (this.showState && this.startHover) {
      setTimeout(() => {
        if (position == 'back') {
          this.timeRemaining = 60;
          this.startClock();
        }
      }, 1000);
    }
  }

  // clock functionality
  @ViewChild('clock1') clock: ClockComponent = new ClockComponent();
  @ViewChild('clock2') clock_item: ClockComponent = new ClockComponent();

  // automatic next ref variable
  @ViewChild('nextref') nextref: any;
  isTimerOn: boolean = false;

  startClock() {
    this.clock.startClock();
    this.clock_item.startClock();
    this.isTimerOn = true;
  }
  stopClock() {
    this.clock.stopClock();
    this.clock_item.stopClock();
    this.isTimerOn = false;
  }

  onTimeRemaining(timeInSeconds: number) {
    this.timeRemaining = timeInSeconds;
    //console.log("Remaining seconds:" + this.timeRemaining);
  }

  onTimeRemaining_item(timeInSeconds_item: number) {
    this.timeRemaining_item = timeInSeconds_item;
    console.log('Remaining seconds (Item):' + this.timeRemaining_item);
  }
}


class dataHandler {
  data_store: studentResponse[] = [];

  constructor(
    totalTimeInSeconds: number,
    totalQuestions: number,
  ) {

  }

  addData(student_res: studentResponse) {
    this.data_store[student_res.question_number - 1] = student_res;
  }

  getAverageTime() {
    var totalTime = 0;
    this.data_store.forEach((element) => {
      totalTime += element.responseTimeInSeconds;
    });
    return (totalTime / this.data_store.length);
  }

  getCorrectAnswers() {
    var correctAnswers = 0;
    this.data_store.forEach((element) => {
      if (element.isCorrect) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  }
  getIncorrectAnswers() {
    var incorrectAnswers = 0;
    this.data_store.forEach((element) => {
      if (!element.isCorrect) {
        incorrectAnswers++;
      }
    });
    return incorrectAnswers;
  }

  getTimetaken() {
    // in Minutes
    var totalTime = 0;
    this.data_store.forEach((element) => {
      totalTime += element.responseTimeInSeconds;
    });
    return totalTime / 60;
  }

  getNumberOfUnattempted() {
    var unattempted = 0;
    this.data_store.forEach((element) => {
      if (!element.isChosen) {
        unattempted++;
      }
    });
    return unattempted;
  }
}
