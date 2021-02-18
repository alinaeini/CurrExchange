import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleExdecListByCurrencysaleIdComponent } from './sale-exdec-list-by-currencysale-id.component';

describe('SaleExdecListByCurrencysaleIdComponent', () => {
  let component: SaleExdecListByCurrencysaleIdComponent;
  let fixture: ComponentFixture<SaleExdecListByCurrencysaleIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleExdecListByCurrencysaleIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleExdecListByCurrencysaleIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
