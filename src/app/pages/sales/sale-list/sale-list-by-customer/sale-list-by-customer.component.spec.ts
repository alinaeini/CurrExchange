import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleListByCustomerComponent } from './sale-list-by-customer.component';

describe('SaleListByCustomerComponent', () => {
  let component: SaleListByCustomerComponent;
  let fixture: ComponentFixture<SaleListByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleListByCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleListByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
