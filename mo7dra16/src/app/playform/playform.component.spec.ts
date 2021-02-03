import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayformComponent } from './playform.component';

describe('PlayformComponent', () => {
  let component: PlayformComponent;
  let fixture: ComponentFixture<PlayformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
