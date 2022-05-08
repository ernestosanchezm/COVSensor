import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmPanelComponent } from './alarm-panel.component';

describe('AlarmPanelComponent', () => {
  let component: AlarmPanelComponent;
  let fixture: ComponentFixture<AlarmPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
