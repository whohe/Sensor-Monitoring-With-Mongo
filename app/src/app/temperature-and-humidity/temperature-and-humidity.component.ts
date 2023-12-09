import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-temperature-and-humidity',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatCardModule],
  templateUrl: './temperature-and-humidity.component.html',
  styleUrl: './temperature-and-humidity.component.css'
})
export class TemperatureAndHumidityComponent implements AfterViewInit, OnDestroy {

	chart: any = [];
	labels: any = [];
	temperature: any = [];
	humidity: any = [];
	data_analysis: any = {};
	isCardVisible: boolean = false;
	cardTitle: string = ""
	cardBody: string = ""

  constructor(private authService: AuthService) {
		this.authService.isLogged=true;
  }

	onSelectChange(event: MatSelectChange) {
		switch(event.value){
			case 'humidity_average':
				this.cardTitle='Sensor de Humedad';
				this.cardBody='Promedio de la Humedad: '+this.data_analysis[event.value].toFixed(3);
				break;
			case 'humidity_standard_deviation':
				this.cardTitle='Sensor de Humedad';
				this.cardBody='Desviacion Estandar de los datos de Humedad: '+this.data_analysis[event.value].toFixed(3);
				break;
			case 'temperature_average':
				this.cardTitle='Sensor de Temperatura';
				this.cardBody='Promedio de la Temperatura: '+this.data_analysis[event.value].toFixed(3);
				break;
			case 'temperature_standard_deviation':
				this.cardTitle='Sensor de Temperatura';
				this.cardBody='Desviacion Estandar de los datos de Temperatura: '+this.data_analysis[event.value].toFixed(3);
				break;
		}
  	this.isCardVisible = true;
	}
	
	async ngAfterViewInit() {
		const response = await fetch('http://localhost:3000/weather');
		var json = await response.json();
		this.data_analysis=json['data-analysis'];
		json = json['data'];
		for (let i=0;i<json.length;i++){
			var date = new Date(0);
			date.setUTCSeconds(json[i]['timestamp']);
			var dateStr=formatDate(date,'yyyy-MM-dd HH:mm',"en-US");
			this.labels.push(dateStr);
			this.temperature.push(json[i]['temperature']);
			this.humidity.push(json[i]['humidity']);
		}
		this.chart = new Chart('temperature-and-humidity', {
			type: 'bar',
			data: {
				labels: this.labels,
				datasets: [
					{
						label: 'Temperatura',
						data: this.temperature,
						borderWidth: 1,
					},
					{
						label: 'Humedad',
						data: this.humidity,
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
						y: {
						beginAtZero: true,
					},
				},
				responsive: true,
				maintainAspectRatio: false,
			},
		});
		this.chart.canvas.parentNode.style.height = '450px';
		var self = this
		async function show(){
			const response = await fetch('http://localhost:3000/weather');
			var json = await response.json();
			self.data_analysis=json['data-analysis'];
			json = json['data'];
			self.labels = [];
			self.temperature = [];
			self.humidity = [];
			for (let i=0;i<json.length;i++){
				var date = new Date(0);
				date.setUTCSeconds(json[i]['timestamp']);
				var dateStr=formatDate(date,'yyyy-MM-dd HH:mm',"en-US");
				self.labels.push(dateStr);
				self.temperature.push(json[i]['temperature']);
				self.humidity.push(json[i]['humidity']);
			}
			self.chart.data.labels = self.labels;
			self.chart.data.datasets[0]['data'] = self.temperature;
			self.chart.data.datasets[1]['data'] = self.humidity;
			self.chart.update();
			console.log(self.chart.data);
			console.log(self.chart.data.datasets[1]['data']);
		}
		setInterval(show, 2000);
	}
	ngOnDestroy(){
		( < HTMLCanvasElement > document.getElementById('temperature-and-humidity')).remove();
	}
}
