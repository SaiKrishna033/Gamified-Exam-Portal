import { Component, ViewChild } from '@angular/core';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
import { ClockComponent } from '../clock/clock.component';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';


interface sharedQuizResults {
  totalQuestions: number;
  averageTime: number;
  notAttempted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalTimeTaken: number;
  startTime: string;
  endTime: string;
  pincode: string;
}

@Component({
  selector: 'app-kuhu-quiz-dashboard',
  templateUrl: './kuhu-quiz-dashboard.component.html',
  styleUrls: ['./kuhu-quiz-dashboard.component.scss'],
})
export class KuhuQuizDashboardComponent {
  faWhatsapp = faWhatsapp;
  topic_name!: string;
  subject!: string;
  mcq_template_id!: string;
  total_questions!: string
  class!: number;
  state: any;

  totalQuestions: number = 0;
  averageTime: number = 0;
  notAttempted: number = 0;
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  totalTimeTaken: number = 0;
  testStartTime: string = "";
  testEndTime: string = "";
  pincode: string = "";

  dateString: string = new Date().toLocaleDateString();

  constructor(private keySvc: EncryptionService, private router: Router, private kuheduService: KuheduServiceService,) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: sharedQuizResults };
    this.state = state;

    if (this.state) {
      this.totalQuestions = this.state.data.totalQuestions;
      this.averageTime = this.state.data.averageTime;
      this.notAttempted = this.state.data.notAttempted;
      this.correctAnswers = this.state.data.correctAnswers;
      this.incorrectAnswers = this.state.data.incorrectAnswers;
      this.totalTimeTaken = this.state.data.totalTimeTaken;
      this.testStartTime = this.state.data.startTime;
      this.testEndTime = this.state.data.endTime;
      this.pincode = this.state.data.pincode;
    } else {
      this.router.navigate(['/kuhu-pin']);
    }
  }

  accessToken: string = '';
  _accessToken: string = '';
  reportsVisibile = false;
  ngOnInit(): void {

    this.kuheduService.DashbaordData.subscribe(res => {
      console.log(res)
      this.topic_name = res.data.item.topic
      this.subject = res.data.item.subject
      this.mcq_template_id = res.data.item.mcq_template_id
      this.total_questions = res.data.item.total_questions
    })
    this.kuheduService.initdata.subscribe(res => {
      console.log(res)
      this.class = res.class
    })
    this.log();
  }

  totalTimeInSeconds: number = 3000;

  @ViewChild('clock1') clock: ClockComponent = new ClockComponent();
  isTimerOn: boolean = false;

  stopClock() {
    this.clock.stopClock();
    this.isTimerOn = false;
  }

  startClock() {
    this.clock.startClock();
    this.isTimerOn = true;
  }

  practiceAgain() {
    this.router.navigate(['/kuhu-pin']);
  }

  log() {
    this.accessToken = localStorage.getItem('kuhuToken') as string;
    console.log('From localstorage:' + this.accessToken);

    this._accessToken = this.keySvc.decryptData(this.accessToken);
    console.log('From localstorage:' + this._accessToken);
  }

  timeRemaining!: number;

  onTimeRemaining(timeInSeconds: number) {
    this.timeRemaining = timeInSeconds;
    console.log('Remaining seconds:' + this.timeRemaining);
  }
}
