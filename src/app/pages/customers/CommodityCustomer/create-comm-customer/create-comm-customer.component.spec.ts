import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommCustomerComponent } from './create-comm-customer.component';

describe('CreateCommCustomerComponent', () => {
  let component: CreateCommCustomerComponent;
  let fixture: ComponentFixture<CreateCommCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
