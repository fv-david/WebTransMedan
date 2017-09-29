import {Component, OnInit} from '@angular/core';
import {PriceTable} from '../../services/price-table/price-table.model';
import {PriceTableService} from '../../services/price-table/price-table.service';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-price-table-admin',
  templateUrl: './price-table-admin.component.html',
  styleUrls: ['./price-table-admin.component.scss']
})
export class PriceTableAdminComponent implements OnInit {

  priceTable: PriceTable = {
    taxPercent: null,
    pricePerKilometer: null
  };

  constructor(public priceTableService: PriceTableService, 
  	public alertsService: AlertService) { }

  ngOnInit() {
  	this.fetchPriceTable();
  }

  fetchPriceTable() {
  	this.priceTableService.getPriceTable().subscribe((priceTable: PriceTable) => {
  		this.priceTable = priceTable;
  	});
  }

  updatePriceTable() {
  	this.priceTableService.setPriceTable(this.priceTable).subscribe((priceTable: PriceTable) => {
  		this.alertsService.addAlert({
  			type: 'success',
  			message: 'Price Table Changed Successfully'
  		});
  		this.priceTable = priceTable;
  	});
  }
}
