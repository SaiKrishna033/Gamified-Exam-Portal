import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KuheduServiceService {
  constructor() {}
  //baseUrl: any = 'http://kuhedu.com/api-dev/';
  baseUrl:string=environment.apiUrl;
  public DashbaordData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public initdata: BehaviorSubject<any> = new BehaviorSubject<any>([]);
}