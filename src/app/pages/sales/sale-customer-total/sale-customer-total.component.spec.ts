import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCustomerTotalComponent } from './sale-customer-total.component';

describe('SaleCustomerTotalComponent', () => {
  let component: SaleCustomerTotalComponent;
  let fixture: ComponentFixture<SaleCustomerTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleCustomerTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleCustomerTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
