import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePiDetailComponent } from './create-pi-detail.component';

describe('CreatePiDetailComponent', () => {
  let component: CreatePiDetailComponent;
  let fixture: ComponentFixture<CreatePiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
