import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceRegisterComponent } from './space-register.component';

describe('SpaceRegisterComponent', () => {
  let component: SpaceRegisterComponent;
  let fixture: ComponentFixture<SpaceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
