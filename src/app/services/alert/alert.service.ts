import { Injectable } from '@angular/core';
import { Alert } from './alert.model';

@Injectable()
export class AlertService {
  
  alerts: Alert[] = [];

  addAlert(alert: Alert) {
  	this.alerts.push(alert);
  }

  removeAlert(alert: Alert) {
  	this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
