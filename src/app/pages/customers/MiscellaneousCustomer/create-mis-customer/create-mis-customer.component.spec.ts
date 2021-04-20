import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMisCustomerComponent } from './create-mis-customer.component';

describe('CreateMisCustomerComponent', () => {
  let component: CreateMisCustomerComponent;
  let fixture: ComponentFixture<CreateMisCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMisCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMisCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
