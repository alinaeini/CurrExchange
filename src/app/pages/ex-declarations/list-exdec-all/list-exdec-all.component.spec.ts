import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExdecAllComponent } from './list-exdec-all.component';

describe('ListExdecAllComponent', () => {
  let component: ListExdecAllComponent;
  let fixture: ComponentFixture<ListExdecAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExdecAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExdecAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
