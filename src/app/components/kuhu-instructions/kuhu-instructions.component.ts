import { Component, ViewChild } from '@angular/core';
import { EncryptionService } from '../../shared/services/encryption.service';
import { ClockComponent } from '../clock/clock.component';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { _kuhuItem } from 'src/app/shared/models/kuhu-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { KuhuItemStateObj } from 'src/app/shared/models/kuhu-item-state';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-kuhu-instructions',
  templateUrl: './kuhu-instructions.component.html',
  styleUrls: ['./kuhu-instructions.component.scss'],
})
export class KuhuInstructionsComponent {
  faWhatsapp = faWhatsapp;
  _kuhuItem_: _kuhuItem | undefined;
  questions: any;
  kuhu_state: any = [];
  _kuhustate: KuhuItemStateObj = {};
  // totalTimeInSeconds: number = 0;
  // timeRemaining = 0;
  totalTimeInSeconds_item: number = 0;
  timeRemaining_item = 0;
  kuhuObj: any;
  question_no: number = 1;
  total_questions: number = 0;
  subject: string = '';
  topic: string = '';
  difficulty_level: string = '';
  constructor(
    private keySvc: EncryptionService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private kuheduService: KuheduServiceService,
    private datePipe: DatePipe,
    private router : Router
  ) {}

  accessToken: string = '';
  _accessToken: string = '';

  instructionData: any = [];
  formattedDate: any;
  pin: any;
  ngOnInit(): void {
    this.pin = this.route.snapshot.params['pin'];
    console.log(this.pin);

    const headers = new HttpHeaders({
      'frontend-header': '5403e66a-b2e7-49a7-b052-d762a3cfb8b3',
    });
    if (this.pin) {
      this.http
        .get(
          this.kuheduService.baseUrl +
            'question/fetch-one-practice-set-using-pincode/' +
            this.pin,
          { headers }
        )
        .subscribe((apidata: any) => {
          this.instructionData = apidata.data;
          this.kuheduService.initdata.next(this.instructionData)
          //console.log(this.instructionData);
          this.formattedDate = this.datePipe.transform(
            this.instructionData['createdAt'],
            'dd-MM-yy'
          );
        });
    }
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

  navigateToQuiz(){

     const headers = new HttpHeaders({
       'frontend-header': '5403e66a-b2e7-49a7-b052-d762a3cfb8b3',
     });
    this.http
      .put(
        this.kuheduService.baseUrl +
          'question/update-practice-set-metadata/' +
          this.instructionData['_id'],{},
        { headers }
      )
      .subscribe((res: any) => {
        this.router.navigate(['/kuhu-quiz-screen', this.pin]);
      });
  }
  log() {
    this.accessToken = localStorage.getItem('kuhuToken') as string;
    //console.log('From localstorage:' + this.accessToken);

    this._accessToken = this.keySvc.decryptData(this.accessToken);
    //console.log('From localstorage:' + this._accessToken);
  }

  timeRemaining!: number;

  onTimeRemaining(timeInSeconds: number) {
    this.timeRemaining = timeInSeconds;
    //console.log('Remaining seconds:' + this.timeRemaining);
  }
}
