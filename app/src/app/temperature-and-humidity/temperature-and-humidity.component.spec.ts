import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureAndHumidityComponent } from './temperature-and-humidity.component';

describe('TemperatureAndHumidityComponent', () => {
  let component: TemperatureAndHumidityComponent;
  let fixture: ComponentFixture<TemperatureAndHumidityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureAndHumidityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureAndHumidityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
