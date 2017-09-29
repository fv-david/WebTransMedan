import { TestBed, inject } from '@angular/core/testing';

import { PriceTableService } from './price-table.service';

describe('PriceTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceTableService]
    });
  });

  it('should be created', inject([PriceTableService], (service: PriceTableService) => {
    expect(service).toBeTruthy();
  }));
});
