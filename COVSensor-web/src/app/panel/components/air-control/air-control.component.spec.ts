import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirControlComponent } from './air-control.component';

describe('AirControlComponent', () => {
  let component: AirControlComponent;
  let fixture: ComponentFixture<AirControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
