import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPiComponent } from './list-pi.component';

describe('ListPiComponent', () => {
  let component: ListPiComponent;
  let fixture: ComponentFixture<ListPiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
