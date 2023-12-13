import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { AskKuhuPinComponent } from './components/ask-kuhu-pin/ask-kuhu-pin.component';
import { KuhuInstructionsComponent } from './components/kuhu-instructions/kuhu-instructions.component';
import { KuhuComponent } from './components/kuhu/kuhu.component';
import { KuhuQuizDashboardComponent } from './components/kuhu-quiz-dashboard/kuhu-quiz-dashboard.component';
import { AboutAssessmentComponent } from './components/about-assessment/about-assessment.component';
import { AboutPracticeComponent } from './components/about-practice/about-practice.component';
import { AboutUsComponent } from './components/about-us/about-us.component'
import { FaqsComponent } from './faqs/faqs.component'
import { KuheduLoginComponent } from './components/kuhedu-login/kuhedu-login.component';
import { KuhedSignupComponent } from './components/kuhed-signup/kuhed-signup.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { CreatQuizComponent } from './components/creat-quiz/creat-quiz.component';
import { DetailedreportComponent } from './detailedreport/detailedreport.component';
import { KuhedunewlogoComponent } from './kuhedunewlogo/kuhedunewlogo.component';
import { MagazineComponent } from './magazine/magazine.component';
import { SchoolAppComponent } from './components/school-app/school-app.component';
import { TeacherAccComponent } from './teacher-acc/teacher-acc.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HelpAndSupportComponent } from './components/help-and-support/help-and-support.component';
import { Report1Component } from './report1/report1.component';
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'kuhu-pin', component: AskKuhuPinComponent },
  { path: 'quiz/:pin', component: KuhuInstructionsComponent },
  { path: 'kuhu-quiz-screen/:pin', component: KuhuComponent },
  { path: 'kuhu-quiz-dashboard', component: KuhuQuizDashboardComponent },
  // { path: 'kuhu-quiz-screen', component: KuhuQuizScreenComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'about-kuhedu-assessment', component: AboutAssessmentComponent },
  { path: 'about-kuhedu-practice', component: AboutPracticeComponent },
  { path: 'teacher-profile', component: TeacherProfileComponent },
  { path: 'student-profile', component: StudentProfileComponent },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent },
  { path: 'create-quiz', component: CreatQuizComponent },
  { path: 'detailedreport', component: DetailedreportComponent },
  { path: 'kuhedulogo', component: KuhedunewlogoComponent },
  { path: 'magazine', component: MagazineComponent },
  { path: 'assessment', component: SchoolAppComponent },
  { path:"help-and-support", component: HelpAndSupportComponent},
  { path: 'teacher-acc', component: TeacherAccComponent },
  { path: 'for', component: ForgotpasswordComponent  },
  { path: 'report1', component: Report1Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
