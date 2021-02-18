import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPiComponent } from './edit-pi.component';

describe('EditPiComponent', () => {
  let component: EditPiComponent;
  let fixture: ComponentFixture<EditPiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
