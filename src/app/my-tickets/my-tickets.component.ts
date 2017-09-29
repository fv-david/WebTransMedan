import { Component, OnInit } from '@angular/core';

import { TicketService } from '../services/ticket/ticket.service';
import { Ticket } from '../services/ticket/ticket.model';
import * as moment from 'moment';
import { Connection } from '../services/connection/connection.model';
import { AlertService } from '../services/alert/alert.service';


@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  tickets: Ticket[] = [];
  ticket: Ticket;

  constructor(public ticketService: TicketService, 
  	public alertsServie: AlertService) { }

  ngOnInit() {
  	this.fetchTickets();
  }

  fetchTickets() {
  	this.ticketService.getAllUserTickets().subscribe((tickets: Ticket[]) => {
  		this.tickets = tickets;
  		this.tickets.sort((t1, t2) => t1.reservationDate < t2.reservationDate ? 1 : -1);
  	});
  }

  cancelReservation(ticket: Ticket) {
  	this.ticketService.cancelBookTicket(ticket.id).subscribe(() => {
  		this.fetchTickets();
  		this.alertsServie.addAlert({
  			type: 'success',
  			message: 'Reservation canceled succesfully'
  		});
  	});
  }

  moreThan30MinutesToDeparture(connection: Connection): boolean {
  	return moment(connection.departureDate).diff(moment(), 'minute') > 30;
  }  

}
