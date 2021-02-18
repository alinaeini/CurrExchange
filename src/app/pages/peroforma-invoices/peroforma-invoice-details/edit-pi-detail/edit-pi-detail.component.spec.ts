import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPiDetailComponent } from './edit-pi-detail.component';

describe('EditPiDetailComponent', () => {
  let component: EditPiDetailComponent;
  let fixture: ComponentFixture<EditPiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
