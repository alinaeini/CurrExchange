import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMisCustomerComponent } from './list-mis-customer.component';

describe('ListMisCustomerComponent', () => {
  let component: ListMisCustomerComponent;
  let fixture: ComponentFixture<ListMisCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMisCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMisCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
