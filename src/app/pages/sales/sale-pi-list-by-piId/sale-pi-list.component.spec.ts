import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePiListComponent } from './sale-pi-list.component';

describe('SalePiListComponent', () => {
  let component: SalePiListComponent;
  let fixture: ComponentFixture<SalePiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalePiListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalePiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
