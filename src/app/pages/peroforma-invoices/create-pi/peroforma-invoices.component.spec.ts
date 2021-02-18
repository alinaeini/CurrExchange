import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeroformaInvoicesComponent } from './peroforma-invoices.component';

describe('PeroformaInvoicesComponent', () => {
  let component: PeroformaInvoicesComponent;
  let fixture: ComponentFixture<PeroformaInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeroformaInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeroformaInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
