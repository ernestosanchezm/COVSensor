import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorPanelComponent } from './sensor-panel.component';

describe('SensorPanelComponent', () => {
  let component: SensorPanelComponent;
  let fixture: ComponentFixture<SensorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
