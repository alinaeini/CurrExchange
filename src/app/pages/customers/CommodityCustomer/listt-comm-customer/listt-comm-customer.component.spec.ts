import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtCommCustomerComponent } from './listt-comm-customer.component';

describe('ListtCommCustomerComponent', () => {
  let component: ListtCommCustomerComponent;
  let fixture: ComponentFixture<ListtCommCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtCommCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtCommCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
