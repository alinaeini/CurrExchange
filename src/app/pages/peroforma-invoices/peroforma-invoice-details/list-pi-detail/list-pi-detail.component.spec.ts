import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPiDetailComponent } from './list-pi-detail.component';

describe('ListPiDetailComponent', () => {
  let component: ListPiDetailComponent;
  let fixture: ComponentFixture<ListPiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
