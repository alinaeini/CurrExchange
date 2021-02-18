import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePiListByCurrencysaleIdComponent } from './sale-pi-list-by-currencysale-id.component';

describe('SalePiListByCurrencysaleIdComponent', () => {
  let component: SalePiListByCurrencysaleIdComponent;
  let fixture: ComponentFixture<SalePiListByCurrencysaleIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalePiListByCurrencysaleIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePiListByCurrencysaleIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
