import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TranslateService } from 'ng2-translate';
import { Title } from '@angular/platform-browser';

import { UserService } from './services/user/user.service';
import { RegisterComponent } from './register/register.component';
import { UserToken } from './services/user/user-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	constructor(public modalService: NgbModal, public translate: TranslateService, 
    public titleService: Title, public userService: UserService, 
    public router: Router) {
        
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('language') || window.navigator.language);
    translate.onLangChange.subscribe(() => {
      translate.get('appTitle').subscribe((title) => this.setAppTitle(title));
    });
  }

  setAppTitle(appTitle) {
    this.titleService.setTitle(appTitle);
  }

  currentUser() {
    return this.userService.getCurrentUser();
  }

  public login = {
    email: 'tobing@admin.pl',
    password: 'admin123'
  };

  loginUser() {
    console.log("Username : " + this.login.email);
    console.log("Password : " + this.login.password);

    if(this.login.email && this.login.password) {
      this.userService.login(this.login.email, this.login.password).subscribe((token: UserToken) => {
        console.log("berhasil login!");
        this.login = {
          email: '',
          password: ''
        };
      });
    }
  }

  changeLanguage(code: string) {
    localStorage.setItem('language', code);
    this.translate.use(code);
  }

  openRegisterModal() {
    this.modalService.open(RegisterComponent);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
