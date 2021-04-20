import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovingCurrencyComponent } from './moving-currency.component';

describe('MovingCurrencyComponent', () => {
  let component: MovingCurrencyComponent;
  let fixture: ComponentFixture<MovingCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovingCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovingCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
