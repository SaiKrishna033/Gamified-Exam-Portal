import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule  } from 'ngx-google-analytics';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { AskKuhuPinComponent } from './components/ask-kuhu-pin/ask-kuhu-pin.component';
import { KuhuKLogoComponent } from './components/kuhu-k-logo/kuhu-k-logo.component';

import { ApplyNumberOnlyDirective } from './shared/directives/apply-number-only.directive';
import { AutoFocusOnLoadDirective } from './shared/directives/auto-focus-on-load.directive';
import { KuhuInstructionsComponent } from './components/kuhu-instructions/kuhu-instructions.component';
import { KuhuComponent } from './components/kuhu/kuhu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClockComponent } from './components/clock/clock.component';
import { KuhuQuizDashboardComponent } from './components/kuhu-quiz-dashboard/kuhu-quiz-dashboard.component';
import { SubjectsListComponent } from './components/subjects-list/subjects-list.component';
import { AboutAssessmentComponent } from './components/about-assessment/about-assessment.component';
import { SchoolContactUsComponent } from './components/school-contact-us/school-contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AboutPracticeComponent } from './components/about-practice/about-practice.component';
import { DatePipe } from '@angular/common';
import {NgToastModule} from 'ng-angular-popup';
import { KuheduLoginComponent } from './components/kuhedu-login/kuhedu-login.component';
import { KuhedSignupComponent } from './components/kuhed-signup/kuhed-signup.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { CreatQuizComponent } from './components/creat-quiz/creat-quiz.component';
import { KuhedunewlogoComponent } from './kuhedunewlogo/kuhedunewlogo.component';
import { MagazineComponent } from './magazine/magazine.component';
import { SchoolAppComponent } from './components/school-app/school-app.component';
import { TeacherAccComponent } from './teacher-acc/teacher-acc.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [

    AppComponent,
    TopbarComponent,
    MenubarComponent,
    HomeComponent,
    FooterComponent,
    DisclaimerComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    AskKuhuPinComponent,
    KuhuKLogoComponent,
    ApplyNumberOnlyDirective,
    AutoFocusOnLoadDirective,
    KuhuInstructionsComponent,
    KuhuComponent,
    ClockComponent,
    KuhuQuizDashboardComponent,
    SubjectsListComponent,
    AboutAssessmentComponent,
    SchoolContactUsComponent,
    AboutUsComponent,
    FaqsComponent,
    AboutPracticeComponent,
    KuheduLoginComponent,
    KuhedSignupComponent,
    TeacherProfileComponent,
    StudentProfileComponent,
    TeacherDashboardComponent,
    CreatQuizComponent,
    KuhedunewlogoComponent,
    MagazineComponent,
    SchoolAppComponent,
    TeacherAccComponent,
    ForgotpasswordComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxGoogleAnalyticsModule.forRoot('G-PS0M4B22BW'),
    NgxGoogleAnalyticsRouterModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgToastModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
