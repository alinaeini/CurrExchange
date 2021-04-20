import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMisCustomerComponent } from './edit-mis-customer.component';

describe('EditMisCustomerComponent', () => {
  let component: EditMisCustomerComponent;
  let fixture: ComponentFixture<EditMisCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMisCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMisCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
