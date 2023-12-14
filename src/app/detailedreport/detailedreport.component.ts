import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


interface ApiResponse {
  status?: number;
  message?: string;
  data?: {
    teacher_name?: string;
    class?: number;
    code?: string;
    topic_name?: string;
    board?: string;
    no_of_views?: number;
    no_of_people_attempted?: number;
    no_of_questions?: number;
    best_score?: number;
    best_time_in_minutes?: number;
    best_traffic_time?: {
      start?: string;
      end?: string;
    };
    average_score?: number;
    average_time_in_minutes?: number;
    reportKpi?: Kpi[];
    individualKpi?: Kpi[];
  };
  meta?: Record<string, unknown>;
  errors?: any[];
  info?: Record<string, unknown>;
}

interface Kpi {
  topic_name?: string;
  name?: string;
  total_number_of_questions?: number;
  maximum_marks?: number;
  minimum_marks?: number;
  best_time?: number;
  average_marks?: number;
  average_percentage?: number;
}

@Component({
  selector: 'app-detailedreport',
  templateUrl: './detailedreport.component.html',
  styleUrls: ['./detailedreport.component.scss'],
})
export class DetailedreportComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private kuheduService: KuheduServiceService,
    private userService: UserService
  ) {}
  reportPin: string = '';

  emptydata: ApiResponse = {
    status: 0,
    message: '',
    data: {
      teacher_name: '',
      class: 0,
      code: '',
      topic_name: '',
      board: '',
      no_of_views: 0,
      no_of_people_attempted: 0,
      no_of_questions: 0,
      best_score: 0,
      best_time_in_minutes: 0,
      best_traffic_time: {
        start: '',
        end: '',
      },
      average_score: 0,
      average_time_in_minutes: 0,
      reportKpi: [],
      individualKpi: [],
    },
    meta: {},
    errors: [],
    info: {},
  };

  detailedReportdata: ApiResponse = this.emptydata;

  ngOnInit(): void {
    this.reportPin = this.router.url.split('/')[2];
    this.fetchDetailedReport(this.reportPin).subscribe(
      (resData) => {
        this.detailedReportdata = resData;
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    console.log(this.detailedReportdata);
  }

  fetchDetailedReport(pin: string): Observable<ApiResponse> {
    const ENDPOINT = 'question/see-detailed-exam-report/' + pin;

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userService.getAccessToken(),
    });

    return this.http
      .get<ApiResponse>(this.kuheduService.baseUrl + ENDPOINT, { headers })
      .pipe(
        map((res: any) => {
          if (res.status === 200) {
            return res;
          } else {
            throw new Error('Request failed with status ' + res.status);
          }
        }),
        catchError((error) => {
          console.error('Registration failed:', error);
          return throwError(error);
        })
      );
  }
}

