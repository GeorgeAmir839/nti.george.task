import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowusersbooksComponent } from './showusersbooks.component';

describe('ShowusersbooksComponent', () => {
  let component: ShowusersbooksComponent;
  let fixture: ComponentFixture<ShowusersbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowusersbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowusersbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
