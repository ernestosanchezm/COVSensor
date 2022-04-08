import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePanelComponent } from './space-panel.component';

describe('SpacePanelComponent', () => {
  let component: SpacePanelComponent;
  let fixture: ComponentFixture<SpacePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
