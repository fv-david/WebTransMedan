import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Captcha } from './captcha.model';
import { Observable } from 'rxjs';

@Injectable()
export class CaptchaService {

  constructor(private http: Http) { }

  getCaptcha(): Observable<Captcha> {
  	return this.http.get('/api/captcha').map((res: Response) => res.json())
  }

}
