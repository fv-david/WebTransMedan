import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from '../services/ticket/ticket.service';
import { PriceTable } from '../services/price-table/price-table.model';
import { PriceTableService } from '../services/price-table/price-table.service';
import { Connection } from '../services/connection/connection.model';
import { Ticket } from '../services/ticket/ticket.model';


@Component({
  selector: 'app-ticket-confirmation',
  templateUrl: './ticket-confirmation.component.html',
  styleUrls: ['./ticket-confirmation.component.scss']
})
export class TicketConfirmationComponent implements OnInit {

  connection: Connection;
  ticket: Ticket;
  public pricePerKilometer = 0;

  constructor(public activeModal: NgbActiveModal, 
    public ticketService: TicketService, 
    public priceTableService: PriceTableService) { }

  ngOnInit() {
  	this.fetchPriceTable();
  }

  fetchPriceTable() {
  	this.priceTableService.getPriceTable().subscribe((priceTable: PriceTable) => {
  		this.pricePerKilometer = priceTable.pricePerKilometer;
  	});
  }

  bookTicket() {
  	this.ticketService.bookTicket(this.connection.id).subscribe((ticket: Ticket) => {
  		this.ticket = ticket;
  	});
  }

}
