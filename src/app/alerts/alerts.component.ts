import { Component, OnInit } from '@angular/core';

import { AlertService } from '../services/alert/alert.service';
import { Alert } from '../services/alert/alert.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(public alertsService: AlertService) { }

  ngOnInit() { }

  closeAlert(alert: Alert) {
  	this.alertsService.removeAlert(alert);
  }

}
