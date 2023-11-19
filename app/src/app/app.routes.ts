import { Routes } from '@angular/router';
import { TemperatureAndHumidityComponent } from './temperature-and-humidity/temperature-and-humidity.component';
import { AtmosphericPressureAndWindSpeedComponent } from './atmospheric-pressure-and-wind-speed/atmospheric-pressure-and-wind-speed.component';
import { NoiseLevelAndAirQualityComponent } from './noise-level-and-air-quality/noise-level-and-air-quality.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
	{path: 'dashboard/temperature-and-humidity', component: TemperatureAndHumidityComponent},
	{path: 'dashboard/atmospheric-pressure-and-wind-speed', component: AtmosphericPressureAndWindSpeedComponent},
	{path: 'dashboard/noise-level-and-air-quality', component: NoiseLevelAndAirQualityComponent},
	{path: 'login', component: LoginComponent },
	{path: 'dashboard', redirectTo: '/dashboard/temperature-and-humidity', pathMatch: 'full' },
	{path: '', redirectTo: '/login', pathMatch: 'full' },
];
