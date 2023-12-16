import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { UserService } from '../../user.service';
import { EncryptionService } from '../../shared/services/encryption.service';
import { NgToastService } from 'ng-angular-popup';

interface Mapping {
  [key: string]: string;
}

@Component({
  selector: 'app-teacher-question-entry',
  templateUrl: './teacher-question-entry.component.html',
  styleUrls: ['./teacher-question-entry.component.scss'],
})
export class TeacherQuestionEntryComponent {
  constructor(
    private kuheduService: KuheduServiceService,
    private keySvc: EncryptionService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toast: NgToastService
  ) {}

  clock: string = '';
  title: any;
  number_of_questions: any;
  current_question_count: number = 1;

  objectKeys = Object.keys;

  // variables for ngModel Bindings
  question: string =
    'Cite the phenomenon when light bends as it passes from one medium to another.';
  option1: string = '';
  option2: string = '';
  option3: string = '';
  option4: string = '';
  correct_option: string = '';
  solution_text: string = 'Soulution text'; // TODO: make changes in both FE and binding
  difficulty_level: number = 0;

  difficultyLevelMapping: Mapping = {
    '01': 'Easy',
    '02': 'Moderate',
    '03': 'Complex',
    '04': 'Advanced',
    '05': 'Expert',
  };

  current_question_count_v: number | string = '';
  next_question_count: number | string = 1;

  // LOCAL STORAGE VARS
  ls_pincode = localStorage.getItem('pincode');
  ls_subject = localStorage.getItem('subject');
  ls_topic_name = localStorage.getItem('topic_name');
  ls_board = localStorage.getItem('board');
  ls_class = localStorage.getItem('class');
  ls_question_type = localStorage.getItem('question_type');
  ls_total_duration_in_minutes = localStorage.getItem('total_t');
  // TODO: Ask backed weather this for total time or per question time
  ls_state_code = localStorage.getItem('state_code');
  ls_language_code = localStorage.getItem('language_code');
  ls_subject_type = localStorage.getItem('subject_type');
  ls_exam_type = localStorage.getItem('exam_type');
  ls_type_of_question = localStorage.getItem('type_of_question');

  // FUNCTIONS
  resetQuestionVars() {
    this.question = '';
    this.option1 = '';
    this.option2 = '';
    this.option3 = '';
    this.option4 = '';
    // this.correct_option = '';
    this.difficulty_level = 0;
  }

  resetLocalStorage() {
    localStorage.removeItem('pincode');
    localStorage.removeItem('subject');
    localStorage.removeItem('topic_name');
    localStorage.removeItem('board');
    localStorage.removeItem('class');
    localStorage.removeItem('question_type');
    localStorage.removeItem('total_t');
    localStorage.removeItem('state_code');
    localStorage.removeItem('language_code');
    localStorage.removeItem('subject_type');
    localStorage.removeItem('exam_type');
    localStorage.removeItem('type_of_question');
  }

  // LOCAL STORAGE LOGIC

  ngOnInit(): void {
    this.number_of_questions = this.router.url.split('/')[2];
    console.log(this.number_of_questions);
  }

  handleCorectAnswer(opt: number) {
    console.log(opt);
    this.correct_option = opt.toString();
  }
  handleNextButton() {
    if (this.current_question_count >= this.number_of_questions) {
      console.log('Its done brother');
      this.next_question_count = '';
    } else {
      this.submitQuestion();
      this.current_question_count += 1;
      this.current_question_count_v = this.current_question_count - 1;
      this.next_question_count = this.current_question_count + 1;
    }

    if (this.current_question_count == this.number_of_questions) {
      // this.resetLocalStorage();
    }
  }

  body_validate() {
    // cant be empty of null
    if (
      this.ls_pincode == '' ||
      this.ls_subject == '' ||
      this.ls_board == '' ||
      this.ls_class == '' ||
      this.ls_question_type == '' ||
      this.ls_topic_name == '' ||
      this.number_of_questions == '' ||
      this.difficulty_level == 0 ||
      this.ls_total_duration_in_minutes == '' ||
      this.ls_state_code == '' ||
      this.ls_language_code == '' ||
      this.ls_subject_type == '' ||
      this.ls_exam_type == '' ||
      this.ls_type_of_question == '' ||
      this.question == '' ||
      this.option1 == '' ||
      this.option2 == '' ||
      this.option3 == '' ||
      this.option4 == '' ||
      this.solution_text == '' ||
      this.correct_option == ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  submitQuestion() {
    const ENDPOINT = 'question/upload-question-one-by-one-teacher';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.userService.getAccessToken(),
    });

    // if (this.body_validate()) {
    //   this.toast.warning({
    //     detail: 'Question submission failed',
    //     summary: 'Failed due to: ' + 'All fields are required',
    //     duration: 3000,
    //     position: 'topRight',
    //   });
    //   return;
    // }

    const body = {
      pin: this.ls_pincode,
      subject: this.ls_subject,
      board: this.ls_board,
      class: this.ls_class,
      question_type: this.ls_question_type,
      topic_name: this.ls_topic_name,
      no_of_questions: this.number_of_questions,
      difficulty_level: this.difficulty_level,
      total_duration_in_minutes: this.ls_total_duration_in_minutes,
      state_code: this.ls_state_code,
      language_code: this.ls_language_code,
      subject_type: this.ls_subject_type,
      exam_type: this.ls_exam_type,
      type_of_question: this.ls_type_of_question,
      question_text: this.question,
      option1_text: this.option1,
      option2_text: this.option2,
      option3_text: this.option3,
      option4_text: this.option4,
      solution_text: this.solution_text,
      correct_option: this.correct_option,
    };

    console.log(body)

    this.http
      .post(this.kuheduService.baseUrl + ENDPOINT, body, {
        headers: headers,
      })
      .subscribe(
        (res: any) => {
          if (res.status == 200) {
            console.log('Question uploaded successfully');
            this.resetQuestionVars();
            // this.handleNextButton(); // TODO: would it be button or automatic?
          }
        },
        (err: any) => {
          this.toast.warning({
            detail: 'Question submission failed',
            summary: 'Failed due to: ' + err.error.message,
            duration: 3000,
            position: 'topRight',
          });

          // TODO: probably redirect to teacher dashboard
        }
      );
  }
}
