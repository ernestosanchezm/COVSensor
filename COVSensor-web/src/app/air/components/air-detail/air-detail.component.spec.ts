import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirDetailComponent } from './air-detail.component';

describe('AirDetailComponent', () => {
  let component: AirDetailComponent;
  let fixture: ComponentFixture<AirDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
