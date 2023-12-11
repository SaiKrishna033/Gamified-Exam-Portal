import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/shared/services/encryption.service';
@Component({
  selector: 'app-kuhedu-login',
  templateUrl: './kuhedu-login.component.html',
  styleUrls: ['./kuhedu-login.component.scss'],
})
export class KuheduLoginComponent {
  @Output() navigateToRegister: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient,
    private khservice: KuheduServiceService,
    private toast: NgToastService,
    private router: Router,
    private security:EncryptionService
  ) {}
  handleEmit() {
    console.log('emited');
    this.navigateToRegister.emit('register');
  }
  handleForgetEmit()
  {
  this.navigateToRegister.emit('forgetpassword')
  }
  handleSubmit(form: any) {
    this.http.post(this.khservice.baseUrl + 'user/login', form).subscribe(
      (res: any) => {
        if (res.status === 200) {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          console.log(res);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Successfully Logged In',
            duration: 3000,
            position: 'topRight',
          });
          const headers = new HttpHeaders({
            'Authorization': 'Bearer '+res.data.accessToken,
          });
          this.http.get(this.khservice.baseUrl + 'user/details',{headers}).subscribe((res:any)=>{
              localStorage.setItem('id',this.security.encryptData(res.data.id));
              localStorage.setItem('email',this.security.encryptData(res.data.email));
              localStorage.setItem('firstName',this.security.encryptData(res.data.firstName));
              window.location.reload();
          });
        } else {
          this.toast.info({
            detail: 'INFO',
            summary: 'Something went wrong!',
            duration: 3000,
            position: 'topRight',
          });
        }
      },
      (error) => {
        console.error('Login failed:', error);

        // Assuming that the error response from the server contains a message
        const errorMessage = error.error
          ? error.error.message
          : 'Unknown error';

        this.toast.info({
          detail: 'INFO',
          summary: 'Login Failed '+errorMessage ,
          duration: 3000,
          position: 'topRight',
        });
      }
    );
  }
}
