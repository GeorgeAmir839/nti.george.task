import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserbookComponent } from './adduserbook.component';

describe('AdduserbookComponent', () => {
  let component: AdduserbookComponent;
  let fixture: ComponentFixture<AdduserbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdduserbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
