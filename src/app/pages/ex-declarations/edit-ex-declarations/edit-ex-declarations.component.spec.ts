import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExDeclarationsComponent } from './edit-ex-declarations.component';

describe('EditExDeclarationsComponent', () => {
  let component: EditExDeclarationsComponent;
  let fixture: ComponentFixture<EditExDeclarationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExDeclarationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
