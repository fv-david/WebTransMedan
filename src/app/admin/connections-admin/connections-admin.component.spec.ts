import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsAdminComponent } from './connections-admin.component';

describe('ConnectionsAdminComponent', () => {
  let component: ConnectionsAdminComponent;
  let fixture: ComponentFixture<ConnectionsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
