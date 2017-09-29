import { Component, OnInit } from '@angular/core';
import { Connection } from '../../services/connection/connection.model';
import { ConnectionService } from '../../services/connection/connection.service';
import * as moment from 'moment';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-connections-admin',
  templateUrl: './connections-admin.component.html',
  styleUrls: ['./connections-admin.component.scss']
})
export class ConnectionsAdminComponent implements OnInit {

  public connection: Connection;
  connections: Connection[] = [];
  emptyConnection: Connection = {
    arrivalDate: moment().add(1, 'day').add(2, 'hour').minute(0).format('YYYY-MM-DD HH:mm'),
    departureDate: moment().add(1, 'day').minute(0).format('YYYY-MM-DD HH:mm'),
    distance: 10,
    endPlace: '',
    startPlace: '',
    places: 40,
    takenPlaces: 0
  };

  newConnection: Connection = Object.assign({}, this.emptyConnection);

  constructor(public connectionsService: ConnectionService, 
  	public alertsService: AlertService) { }

  ngOnInit() {
  	this.fetchConnections();
  }

  fetchConnections() {
  	this.connectionsService.getAllConnections().subscribe((connections: Connection[]) => {
  		this.connections = connections;
  		this.connections.push(this.newConnection);
  	});
  }

  addConnection(connection: Connection) {
  	connection.departureDate = connection.departureDate.toString();
  	connection.arrivalDate = connection.arrivalDate.toString();
  	this.connectionsService.addConnection(connection).subscribe(() => {
  		this.alertsService.addAlert({
  			type: 'success',
  			message: 'Added Successfully'
  		});
  		this.newConnection = Object.assign({}, this.emptyConnection);
  		this.fetchConnections();
  	});
  }

  updateConnection(connection: Connection) {
  	connection.departureDate = connection.departureDate.toString();
  	connection.arrivalDate = connection.arrivalDate.toString();
  	this.connectionsService.updateConnection(connection).subscribe(() => {
  		this.alertsService.addAlert({
  			type: 'success',
  			message: 'Updated Successfully'
  		});
  		this.fetchConnections();
  	});
  }

  deleteConnection(id: number) {
  	this.connectionsService.removeConnection(id).subscribe(() => {
  		this.alertsService.addAlert({
  			type: 'success',
  			message: 'Deleted Successfully'
  		});
  		this.fetchConnections();
  	});
  }
}
