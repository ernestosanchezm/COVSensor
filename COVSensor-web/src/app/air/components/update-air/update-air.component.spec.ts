import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAirComponent } from './update-air.component';

describe('UpdateAirComponent', () => {
  let component: UpdateAirComponent;
  let fixture: ComponentFixture<UpdateAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
