import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Role } from './role.model';

@Injectable()
export class RoleService {

  constructor(private authHttp: AuthHttp) { }

  getAllRoles(): Observable<Role[]> {
  	return this.authHttp.get('/api/admin/roles').map((res: Response) => res.json());
  }

  addRole(role: Role): Observable<Role> {
  	return this.authHttp.post('/api/admin/roles', role).map((res: Response) => res.json());
  }

  updateRole(role: Role): Observable<Role> {
  	return this.authHttp.put('/api/admin/roles', role).map((res: Response) => res.json());
  }

  deleteRole(id: number): Observable<Response> {
  	return this.authHttp.delete('/api/admin/roles/' + id);
  }
}
