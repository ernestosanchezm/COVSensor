import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlarmComponent } from './update-alarm.component';

describe('UpdateAlarmComponent', () => {
  let component: UpdateAlarmComponent;
  let fixture: ComponentFixture<UpdateAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAlarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
