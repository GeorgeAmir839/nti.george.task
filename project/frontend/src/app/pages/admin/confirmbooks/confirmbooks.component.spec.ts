import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmbooksComponent } from './confirmbooks.component';

describe('ConfirmbooksComponent', () => {
  let component: ConfirmbooksComponent;
  let fixture: ComponentFixture<ConfirmbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
