import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirPanelComponent } from './air-panel.component';

describe('AirPanelComponent', () => {
  let component: AirPanelComponent;
  let fixture: ComponentFixture<AirPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
