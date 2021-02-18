import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExDeclarationsComponent } from './ex-declarations.component';

describe('ExDeclarationsComponent', () => {
  let component: ExDeclarationsComponent;
  let fixture: ComponentFixture<ExDeclarationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExDeclarationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
