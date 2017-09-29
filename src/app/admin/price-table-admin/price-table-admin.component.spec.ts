import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTableAdminComponent } from './price-table-admin.component';

describe('PriceTableAdminComponent', () => {
  let component: PriceTableAdminComponent;
  let fixture: ComponentFixture<PriceTableAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceTableAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
