import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Headers, Response, Http } from '@angular/http';

import { Observable } from 'rxjs';
import { Ticket } from './ticket.model';

@Injectable()
export class TicketService {

  constructor(private authHttp: AuthHttp, private http: Http) { }

  bookTicket(connectionId: number): Observable<Ticket> {
    let url: string = "/api/tickets/book/" + connectionId;
    return this.authHttp.post(url, null).map((res: Response) => res.json());
  }

  cancelBookTicket(tikcetId): Observable<Response> {
    return this.authHttp.delete('/api/tickets/' + tikcetId + '/cancel');
  }

  getAllUserTickets(): Observable<Ticket[]> { 
    return this.authHttp.get('/api/tickets').map((res: Response) => res.json());
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.authHttp.get('/api/admin/tickets').map((res: Response) => res.json());
  }

  deleteTicket(id: number): Observable<Response> {
    return this.authHttp.delete('/api/admin/tickets/' + id);
  }
}
