import { Injectable } from '@angular/core';

import { Headers, Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { PriceTable } from './price-table.model';

@Injectable()
export class PriceTableService {

  	constructor(private http: Http, private authHttp: AuthHttp) { }

  	getPriceTable(): Observable<PriceTable> {
        return this.http.get('/api/pricetable').map((res: Response) => res.json());
    }

    setPriceTable(priceTable: PriceTable): Observable<PriceTable> {
        return this.authHttp.post('/api/admin/pricetable', priceTable).map((res: Response) => res.json());
    }

}
