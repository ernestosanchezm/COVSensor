import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2ControlComponent } from './co2-control.component';

describe('Co2ControlComponent', () => {
  let component: Co2ControlComponent;
  let fixture: ComponentFixture<Co2ControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Co2ControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Co2ControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
