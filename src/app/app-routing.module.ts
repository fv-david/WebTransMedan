import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ScheduleComponent } from './schedule/schedule.component';
import { AdminGuardService } from './services/http/admin-guard.service';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { TicketConfirmationComponent } from './ticket-confirmation/ticket-confirmation.component';
import { AdminComponent } from './admin/admin.component';


const routingApplikasi: Routes = [
  {
    path: "schedule", component: ScheduleComponent
  },
  {
    path: "ticket", component: TicketConfirmationComponent
  },
  {
    path: "tickets", component: MyTicketsComponent
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuardService]
  },
  {
    path: "", redirectTo: '/schedule', pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routingApplikasi)
  ],
  exports: [
  	RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
