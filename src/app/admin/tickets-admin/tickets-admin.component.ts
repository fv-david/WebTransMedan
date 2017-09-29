import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket/ticket.service';
import { AlertService } from '../../services/alert/alert.service';
import { Ticket } from '../../services/ticket/ticket.model';


@Component({
  selector: 'app-tickets-admin',
  templateUrl: './tickets-admin.component.html',
  styleUrls: ['./tickets-admin.component.scss']
})
export class TicketsAdminComponent implements OnInit {

  public tickets: Ticket[] = [];
  public ticket: Ticket;
  
  constructor(public ticketsService: TicketService, 
  	public alertsService: AlertService) { }

  ngOnInit() {
  	this.fetchTickets();
  }

  fetchTickets() {
  	this.ticketsService.getAllTickets().subscribe((tickets: Ticket[]) => {
  		this.tickets = tickets;
  		this.tickets.sort((t1, t2) => t1.reservationDate > t2.reservationDate ? 1 : -1);
  	});
  }

  deleteTicket(ticket: Ticket) {
  	this.ticketsService.deleteTicket(ticket.id).subscribe(() => {
  		this.alertsService.addAlert({
  			type: 'success',
  			message: 'Deleted Successfully'
  		});
  		this.fetchTickets();
  	});
  }
}
