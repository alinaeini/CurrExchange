import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllPiComponent } from './list-all-pi.component';

describe('ListAllPiComponent', () => {
  let component: ListAllPiComponent;
  let fixture: ComponentFixture<ListAllPiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllPiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
