import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExDeclarationComponent } from './list-ex-declaration.component';

describe('ListExDeclarationComponent', () => {
  let component: ListExDeclarationComponent;
  let fixture: ComponentFixture<ListExDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExDeclarationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
