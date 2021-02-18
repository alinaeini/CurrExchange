import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleExdecListComponent } from './sale-exdec-list.component';

describe('SaleExdecListComponent', () => {
  let component: SaleExdecListComponent;
  let fixture: ComponentFixture<SaleExdecListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleExdecListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleExdecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
