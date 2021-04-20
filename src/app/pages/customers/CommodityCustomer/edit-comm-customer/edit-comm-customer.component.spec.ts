import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommCustomerComponent } from './edit-comm-customer.component';

describe('EditCommCustomerComponent', () => {
  let component: EditCommCustomerComponent;
  let fixture: ComponentFixture<EditCommCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCommCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
