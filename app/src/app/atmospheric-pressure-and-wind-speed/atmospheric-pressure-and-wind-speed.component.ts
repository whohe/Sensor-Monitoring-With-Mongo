import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-atmospheric-pressure-and-wind-speed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atmospheric-pressure-and-wind-speed.component.html',
  styleUrl: './atmospheric-pressure-and-wind-speed.component.css'
})
export class AtmosphericPressureAndWindSpeedComponent {
	atmosphericPressure: any = []
	windSpeed: any = []
	pressure_average= 0;
	wind_speed_average = 0;

  constructor(private authService: AuthService) {
		this.authService.isLogged=true;
  }
	ngOnInit() {
		fetch('http://localhost:3000/meteorological')
		.then((response) => response.json())
		.then((json) => {
			var labels=[]
			var pressure=[]
			var wind_speed=[]
			for (let i=0;i<json.length;i++){
				var date = new Date(0);
				date.setUTCSeconds(json[i]['timestamp']);
				var dateStr=formatDate(date,'yyyy-MM-dd HH:mm',"en-US");
				labels.push(dateStr);
				pressure.push(json[i]['pressure']);
				wind_speed.push(json[i]['wind_speed']);
			}
			this.pressure_average=pressure.reduce((a, b) => a + b, 0)/12;
			this.wind_speed_average=wind_speed.reduce((a, b) => a + b, 0)/12;
			this.atmosphericPressure = new Chart('atmospheric-pressure', {
				type: 'line',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Presion Atmosferica',
							data: pressure,
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: false,
						},
					},
					responsive: true,
					maintainAspectRatio: false,
				},
			});
			this.atmosphericPressure.canvas.parentNode.style.height = '450px';
			this.windSpeed = new Chart('wind-speed', {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Velocidad del Viento',
							data: wind_speed,
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: false,
						},
					},
					responsive: true,
					maintainAspectRatio: false,
				},
			});
			this.windSpeed.canvas.parentNode.style.height = '450px';
    });
	}
	ngOnDestroy(){
		( < HTMLCanvasElement > document.getElementById('wind-speed')).remove();
		( < HTMLCanvasElement > document.getElementById('atmospheric-pressure')).remove();
	}
}
