import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoiseLevelAndAirQualityComponent } from './noise-level-and-air-quality.component';

describe('NoiseLevelAndAirQualityComponent', () => {
  let component: NoiseLevelAndAirQualityComponent;
  let fixture: ComponentFixture<NoiseLevelAndAirQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoiseLevelAndAirQualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoiseLevelAndAirQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
