import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from '../../shared/services/encryption.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KuheduServiceService } from 'src/app/kuhedu-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-ask-kuhu-pin',
  templateUrl: './ask-kuhu-pin.component.html',
  styleUrls: ['./ask-kuhu-pin.component.scss'],
})

export class AskKuhuPinComponent {

  constructor(private router: Router,
    private keySvc: EncryptionService,
    private kuheduService: KuheduServiceService,
    private http: HttpClient,
    private toast: NgToastService
  ) { }


  pin = "321654";
  _pin: string = "";
  kuhuid = "";
  kuhuToken = "";
  displayError = false;
  isPinValid: boolean = false;

  pinform = new FormGroup(
    {
      pin_part_1: new FormControl(null, [Validators.required, Validators.pattern("[0-9]")]),
      pin_part_2: new FormControl(null, [Validators.required, Validators.pattern("[0-9]")]),
      pin_part_3: new FormControl(null, [Validators.required, Validators.pattern("[0-9]")]),
      pin_part_4: new FormControl(null, [Validators.required, Validators.pattern("[0-9]")]),
      pin_part_5: new FormControl(null, [Validators.required, Validators.pattern("[0-9]")]),
      pin_part_6: new FormControl(null, [Validators.required, Validators.pattern("[0-9]")]),
    }
  );

  //on form submission
  onSubmit() {

    this._pin = this.sanitize(this.pinform.value.pin_part_1) + this.sanitize(this.pinform.value.pin_part_2) +
      this.sanitize(this.pinform.value.pin_part_3) + this.sanitize(this.pinform.value.pin_part_4) +
      this.sanitize(this.pinform.value.pin_part_5) + this.sanitize(this.pinform.value.pin_part_6);

    //search from db logic
    const headers = new HttpHeaders({
      'frontend-header': '5403e66a-b2e7-49a7-b052-d762a3cfb8b3',
    });

    this.http.get(
      this.kuheduService.baseUrl +
      `question/validate-pincode/${this._pin}`,
      { headers }
    ).subscribe((apidata: any) => {
      this.isPinValid = apidata.data;
      console.log("1." + this.isPinValid);

      if (this.isPinValid) {
        console.log("2." + this.isPinValid);
        this.toast.success({
          detail: 'SUCCESS',
          summary: "You are being redirected to the Kuhu page",
          duration: 3000,
          position: 'topRight',
        });


        this.kuhuid = "K-" + this._pin;

        if (this._pin) {
          //save kuhu encrypted id in local storage for onward access and navigate
          this.kuhuToken = this.keySvc.encryptData(this.kuhuid);
          localStorage.setItem("kuhuToken", this.kuhuToken);

          //console.log("Actual id:" + this.kuhuid + '   ' + "Encrypted Token:" + this.kuhuToken);

          this.router.navigate(['/quiz', this._pin]);
        } else {
          //display error
          this.displayError = true;
        }
      } else {
        console.log("3." + this.isPinValid);
        this.toast.error({
          detail: 'ERROR',
          summary: "Pin not found. Try again",
          duration: 4000,
          position: 'topRight',
        });
      }

    });
  }

  sanitize(value: any) {
    if (isNaN(value)) {
      return '';
    } else {
      return value;
    };
  }

  keytab(event: any) {

    //console.log(this.pinform.status);
    this.displayError = false;

    if (!isNaN(event.key)) {
      let element = event.srcElement.nextElementSibling;
      if (element != null) {
        element.focus();
      }
    }

    if (event.key == 'Backspace') {
      let element = event.srcElement.previousElementSibling;
      if (element != null) {
        element.focus();
      }
    }
  }
}
