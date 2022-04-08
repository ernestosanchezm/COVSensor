import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirRegisterComponent } from './air-register.component';

describe('AirRegisterComponent', () => {
  let component: AirRegisterComponent;
  let fixture: ComponentFixture<AirRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
