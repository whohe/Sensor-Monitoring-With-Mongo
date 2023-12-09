import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-atmospheric-pressure-and-wind-speed',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatCardModule],
  templateUrl: './atmospheric-pressure-and-wind-speed.component.html',
  styleUrl: './atmospheric-pressure-and-wind-speed.component.css'
})
export class AtmosphericPressureAndWindSpeedComponent {
	atmosphericPressure: any = [];
	windSpeed: any = [];
	labels: any = [];
	pressure: any = [];
	wind_speed: any = [];
	data_analysis: any = {};
	isCardVisible: boolean = false;
	cardTitle: string = ""
	cardBody: string = ""

  constructor(private authService: AuthService) {
		this.authService.isLogged=true;
  }

	onSelectChange(event: MatSelectChange) {
		switch(event.value){
			case 'pressure_average':
				this.cardTitle='Sensor de Presion Atmosferica';
				this.cardBody='Promedio de la Presion Atmosferica: '+this.data_analysis[event.value].toFixed(3);
				break;
			case 'pressure_standard_deviation':
				this.cardTitle='Sensor de Presion Atmosferica';
				this.cardBody='Desviacion Estandar de la Presion Atmosferica: '+this.data_analysis[event.value].toFixed(3);
				break;
			case 'wind_speed_average':
				this.cardTitle='Sensor de Velocidad del Viento';
				this.cardBody='Promedio de la Velocidad del Viento: '+this.data_analysis[event.value].toFixed(3);
				break;
			case 'wind_speed_standard_deviation':
				this.cardTitle='Sensor de Velocidad del Viento';
				this.cardBody='Desviacion Estandar de la Velocidad del Viento: '+this.data_analysis[event.value].toFixed(3);
				break;
		}
  	this.isCardVisible = true;
	}

	async ngAfterViewInit() {
		const response = await fetch('http://localhost:3000/meteorological');
		var json = await response.json();
		this.data_analysis=json['data-analysis'];
		json = json['data'];
		for (let i=0;i<json.length;i++){
			var date = new Date(0);
			date.setUTCSeconds(json[i]['timestamp']);
			var dateStr=formatDate(date,'yyyy-MM-dd HH:mm',"en-US");
			this.labels.push(dateStr);
			this.pressure.push(json[i]['pressure']);
			this.wind_speed.push(json[i]['wind_speed']);
		}
		this.atmosphericPressure = new Chart('atmospheric-pressure', {
			type: 'line',
			data: {
				labels: this.labels,
				datasets: [
					{
						label: 'Presion Atmosferica',
						data: this.pressure,
						borderWidth: 1,
						borderColor: '#000',
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
		this.windSpeed = new Chart('wind-speed', {
		type: 'bar',
			data: {
				labels: this.labels,
				datasets: [
					{
						label: 'Velocidad del Viento',
						data: this.wind_speed,
						borderWidth: 1,
						borderColor: '#fff',
      			backgroundColor: '#ffda33',
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
		this.windSpeed.canvas.parentNode.style.height = '450px';
		var self = this
		async function show(){
			const response = await fetch('http://localhost:3000/meteorological');
			var json = await response.json();
			self.data_analysis=json['data-analysis'];
			json = json['data'];
			self.labels = [];
			self.pressure = [];
			self.wind_speed = [];
			for (let i=0;i<json.length;i++){
				var date = new Date(0);
				date.setUTCSeconds(json[i]['timestamp']);
				var dateStr=formatDate(date,'yyyy-MM-dd HH:mm',"en-US");
				self.labels.push(dateStr);
				self.pressure.push(json[i]['pressure']);
				self.wind_speed.push(json[i]['wind_speed']);
			}
			self.atmosphericPressure.data.labels = self.labels;
			self.atmosphericPressure.data.datasets[0]['data'] = self.pressure;
			self.atmosphericPressure.update();
			self.windSpeed.data.labels = self.labels;
			self.windSpeed.data.datasets[0]['data'] = self.wind_speed;
			self.windSpeed.update();
			//console.log(self.chart.data);
			//console.log(self.chart.data.datasets[1]['data']);
		}
		setInterval(show, 2000);
	}

	ngOnDestroy(){
		( < HTMLCanvasElement > document.getElementById('wind-speed')).remove();
		( < HTMLCanvasElement > document.getElementById('atmospheric-pressure')).remove();
	}
}
