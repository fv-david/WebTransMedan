import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';

import { SharedModule } from './shared/shared.module';

import { UserService } from './services/user/user.service';
import { TicketService } from './services/ticket/ticket.service';
import { PriceTableService } from './services/price-table/price-table.service';
import { ConnectionService } from './services/connection/connection.service';
import { AlertService } from './services/alert/alert.service';
import { AdminGuardService } from './services/http/admin-guard.service';
import { CaptchaService } from './services/captcha/captcha.service';
import { RoleService } from './services/role/role.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RegisterComponent } from './register/register.component';
import { EqualsDirective } from './shared/equals.directive';
import { TicketConfirmationComponent } from './ticket-confirmation/ticket-confirmation.component';
import { AlertsComponent } from './alerts/alerts.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { AdminComponent } from './admin/admin.component';
import { ConnectionsAdminComponent } from './admin/connections-admin/connections-admin.component';
import { PriceTableAdminComponent } from './admin/price-table-admin/price-table-admin.component';
import { RolesAdminComponent } from './admin/roles-admin/roles-admin.component';
import { TicketsAdminComponent } from './admin/tickets-admin/tickets-admin.component';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
      tokenName: 'access_token'
    }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    RegisterComponent,
    TicketConfirmationComponent,
    AlertsComponent,
    MyTicketsComponent,
    AdminComponent,
    ConnectionsAdminComponent,
    PriceTableAdminComponent,
    RolesAdminComponent,
    TicketsAdminComponent,
    UsersAdminComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    Ng2DatetimePickerModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    })
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    UserService,
    TicketService,
    PriceTableService,
    ConnectionService,
    AlertService,
    AdminGuardService,
    CaptchaService,
    RoleService
  ],
  entryComponents: [
    TicketConfirmationComponent,
    RegisterComponent,
    RolesAdminComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
