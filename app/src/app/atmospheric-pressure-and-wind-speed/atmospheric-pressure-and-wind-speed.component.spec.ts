import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmosphericPressureAndWindSpeedComponent } from './atmospheric-pressure-and-wind-speed.component';

describe('AtmosphericPressureAndWindSpeedComponent', () => {
  let component: AtmosphericPressureAndWindSpeedComponent;
  let fixture: ComponentFixture<AtmosphericPressureAndWindSpeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtmosphericPressureAndWindSpeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtmosphericPressureAndWindSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
