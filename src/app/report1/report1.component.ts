import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KuheduServiceService } from '../kuhedu-service.service';
import { UserService } from '../user.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface ApiResponse {
  status?: number;
  message?: string;
  data?: {
    topic_name?: string;
    class?: number;
    no_of_questions?: number;
    no_of_people_attempted?: number;
    best_score?: number;
  };
  meta?: Record<string, unknown>;
  errors?: any[];
  info?: Record<string, unknown>;
}

@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.scss']
})
export class Report1Component {
  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private kuheduService: KuheduServiceService,
  ) { }
  reportPin: string = '';

  emptydata: ApiResponse = {
    status: 0,
    message: '',
    data: {
      topic_name: '',
      class: 0,
      no_of_questions: 0,
      no_of_people_attempted: 0,
      best_score: 0,
    },
    meta: {},
    errors: [],
    info: {},
  };

  reportData: ApiResponse = this.emptydata;

  ngOnInit():void {
    this.reportPin = this.router.url.split('/')[2];
    this.fetchReport(this.reportPin).subscribe((resData) => {
      this.reportData = resData;
      console.log(this.reportData);
    });
    console.log(this.reportPin);
  }

  fetchReport(practiceSetPin: string): Observable<ApiResponse> {
    const ENDPOINT = 'question/see-exam-report/';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.userService.getAccessToken()}`,
    })

    return this.http
    .get<ApiResponse>(this.kuheduService.baseUrl + ENDPOINT + practiceSetPin, { headers })
    .pipe(
      map((resData) => {
        return resData;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  // TODO: Handle multiple reports when API is ready

  handleDetailedReportClick(reportPin: string) {
    this.router.navigate(['/detailedreport', reportPin]);
  }
}
