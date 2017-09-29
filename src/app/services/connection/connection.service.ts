import { Injectable } from '@angular/core';

import { Headers, Response, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Connection } from './connection.model';
import { Observable } from 'rxjs';

@Injectable()
export class ConnectionService {

  constructor(private http: Http, 
  	private authHttp: AuthHttp) { }

  getAllConnections(): Observable<Connection[]> {
  	let headers = new Headers({
  		'Content-Type': 'application/json'
  	});

  	let url: string = "/api/connections";
  	return this.http.get(url, { headers: headers }).map((res: Response) => res.json());
  }

  addConnection(connection: Connection): Observable<Connection> {
  	return this.authHttp.post('/api/admin/connections', connection).
  		map((res: Response) => res.json());
  }

  updateConnection(connection: Connection): Observable<Connection> {
  	return this.authHttp.put('/api/admin/connections', connection).
  		map((res: Response) => res.json());
  }

  removeConnection(id: number): Observable<Response> {
 	return this.authHttp.delete('/api/admin/connections/' + id);
  }
}
