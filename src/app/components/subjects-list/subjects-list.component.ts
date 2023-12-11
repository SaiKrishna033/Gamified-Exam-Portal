import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
})
export class SubjectsListComponent {
  constructor(
    private kuheduService: KuheduServiceService,
    private http: HttpClient,
    private router: Router,
    private toast:NgToastService
  ) { }

  instructionData: any = [];
  page: any = 1;
  lastInSet: string = "";
  subject:string="";
  selected_subject_code: string = "";
  reached_last_page: boolean = false;

  ngOnInit() {
    //console.log(this.instructionData);
    this.getPracticeSetsPerPage();
  }
  getPracticeSetsPerPage() {
    //console.log("Fetching Page No:" + this.page)
    const headers = new HttpHeaders({
      'frontend-header': '5403e66a-b2e7-49a7-b052-d762a3cfb8b3',
    });

    if (this.selected_subject_code == "") {
      console.log("Fetchning without subject code");
      this.http
        .get(
          this.kuheduService.baseUrl +
          `question/fetch-all-practice-sets-using-pagination?resultsPerPage=6&page=${this.page}`,
          { headers }
        )
        .subscribe((apidata: any) => {
          if (apidata.data.practiceSets.length > 0 && apidata.data.practiceSets[apidata.data.practiceSets.length - 1]._id != this.lastInSet) {
            this.instructionData = apidata.data.practiceSets;
            this.lastInSet = apidata.data.practiceSets[apidata.data.practiceSets.length - 1]._id;
            this.reached_last_page = false;
          } else {
            this.reached_last_page = true;
            this.page = this.page - 1;
          }
        });
    } else {
      console.log("Fetchning WITH subject code");
      this.http
        .get(
          this.kuheduService.baseUrl +
          `question/fetch-all-practice-sets-using-pagination?resultsPerPage=6&page=${this.page}&subject_code=${this.selected_subject_code}`,
          { headers }
        )
        .subscribe((apidata: any) => {
          if (apidata.data.practiceSets.length > 0 && apidata.data.practiceSets[apidata.data.practiceSets.length - 1]._id != this.lastInSet) {
            this.instructionData = apidata.data.practiceSets;
            this.lastInSet = apidata.data.practiceSets[apidata.data.practiceSets.length - 1]._id;
            this.reached_last_page = false;
          } else {
            this.reached_last_page = true;
            this.page = this.page - 1;
          }
        });
    }

  }

  fetchNewData(pos: string) {

    if (pos == 'left' && this.page > 1) {
      this.page = this.page - 1;
      this.lastInSet = "";
      this.reached_last_page = false;
      this.getPracticeSetsPerPage();
      console.log(this.instructionData);
    }

    if (pos == 'right' && !this.reached_last_page) {
      this.page = this.page + 1;
      this.getPracticeSetsPerPage();
      console.log(this.instructionData);
    }
  }
  getSubjectClass(subjectCode: string): string {
    // Define the mapping of subject_code to class names
    const classMap: { [key: string]: string } = {
      PHY: 'physics',
      CHM: 'chemistry',
      BIO: 'biology', // Add more mappings as needed
      MATH: 'mathematics',
    };

    return classMap[subjectCode] || ''; // Return the corresponding class or an empty string if not found
  }


  selectUnselectSubject(subCode: string) {
    this.selected_subject_code = this.selected_subject_code == subCode ? "" : subCode;
    this.page=1;
    this.lastInSet = "";
    this.reached_last_page = false;
    console.log("New code:"+this.selected_subject_code);

    if (this.selected_subject_code!=""){
      this.toast.success({
        detail: 'INFO',
        summary: "You have set a new filter on " + this.getSubjectClass(this.selected_subject_code).toUpperCase(),
        duration: 4000,
        position: 'bottomRight',
      });
    }else{
      this.toast.info({
        detail: 'INFO',
        summary: "You have cleared the subject filter",
        duration: 4000,
        position: 'bottomRight',
      });
    }
    

    this.getPracticeSetsPerPage();
  }

  redirect(data: any) {
    this.router.navigate(['/quiz', data]);
  }
}
