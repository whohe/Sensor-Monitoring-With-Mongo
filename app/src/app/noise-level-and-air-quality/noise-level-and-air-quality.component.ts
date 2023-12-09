import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-noise-level-and-air-quality',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatCardModule],
  templateUrl: './noise-level-and-air-quality.component.html',
  styleUrl: './noise-level-and-air-quality.component.css'
})
export class NoiseLevelAndAirQualityComponent {
	airQuality: any = [];
	noiseLevel: any = [];
	labels: any = [];
	noise_level: any = [];
	air_quality: any = [];
	data_analysis: any = {};
	isCardVisible: boolean = false;
	cardTitle: string = ""
	cardBody: string = ""

  constructor(private authService: AuthService) {
		this.authService.isLogged=true;
  }

	onSelectChange(event: MatSelectChange) {
		switch(event.value){
			case 'noise_level_average':
				this.cardTitle='Sensor de Ruido';
				this.cardBody='Promedio de la Nivel de Ruido: '+this.data_analysis[event.value].toFixed(3);
				break;
			case 'noise_level_standard_deviation':
				this.cardTitle='Sensor de Ruido';
				this.cardBody='Desviacion Estandar de los datos de Nivel de Ruido: '+this.data_analysis[event.value].toFixed(3);
				break;
			case 'air_quality_average':
				this.cardTitle='Sensor de Calidad del Aire';
				this.cardBody='Promedio de la Calidad del Aire: '+this.data_analysis[event.value].toFixed(3);
				break;
			case 'air_quality_standard_deviation':
				this.cardTitle='Sensor de Calidad del Aire';
				this.cardBody='Desviacion Estandar de los datos de la Calidad del Aire: '+this.data_analysis[event.value].toFixed(3);
				break;
		}
  	this.isCardVisible = true;
	}

	async ngAfterViewInit() {
		const response = await fetch('http://localhost:3000/ambient')
		var json = await response.json();
		this.data_analysis=json['data-analysis'];
		json = json['data'];
		for (let i=0;i<json.length;i++){
			var date = new Date(0);
			date.setUTCSeconds(json[i]['timestamp']);
			var dateStr=formatDate(date,'yyyy-MM-dd HH:mm',"en-US");
			this.labels.push(dateStr);
			this.noise_level.push(json[i]['noise_level']);
			this.air_quality.push(json[i]['air_quality']);
		}
		this.airQuality = new Chart('air-quality', {
			type: 'line',
			data: {
				labels: this.labels,
				datasets: [
					{
						label: 'Calidad del Aire',
						data: this.air_quality,
						borderWidth: 1,
						borderColor: '#2555d3',
					}
				],
			},
			options: {
				scales: {
					y: {
          	ticks: {
            	callback: function(value, index, values) {
								switch(value){
									case 1:
										return 'Buena';
										break;
									case 0:
										return 'Moderada';
										break;
									case -1:
										return 'Mala';
										break;
									default:
										return value;
								}
              }
          	}
        	}
				},
				responsive: true,
				maintainAspectRatio: false,
			},
		});
		this.noiseLevel = new Chart('noise-level', {
			type: 'bar',
			data: {
				labels: this.labels,
				datasets: [
					{
						label: 'Nivel de Ruido',
						data: this.noise_level,
						borderWidth: 1,
      			backgroundColor: '#51c000',
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
		this.airQuality.canvas.parentNode.style.height = '450px';
		this.noiseLevel.canvas.parentNode.style.height = '450px';
		var self = this
		async function show(){
			const response = await fetch('http://localhost:3000/ambient');
			var json = await response.json();
			self.data_analysis=json['data-analysis'];
			json = json['data'];
			self.labels = [];
			self.noise_level = [];
			self.air_quality = [];
			for (let i=0;i<json.length;i++){
				var date = new Date(0);
				date.setUTCSeconds(json[i]['timestamp']);
				var dateStr=formatDate(date,'yyyy-MM-dd HH:mm',"en-US");
				self.labels.push(dateStr);
				self.noise_level.push(json[i]['noise_level']);
				self.air_quality.push(json[i]['air_quality']);
			}
			self.noiseLevel.data.labels = self.labels;
			self.noiseLevel.data.datasets[0]['data'] = self.noise_level;
			self.noiseLevel.update();
			self.airQuality.data.labels = self.labels;
			self.airQuality.data.datasets[0]['data'] = self.air_quality;
			self.airQuality.update();
			//console.log(self.chart.data);
			//console.log(self.chart.data.datasets[1]['data']);
		}
		setInterval(show, 2000);
	}

	ngOnDestroy(){
		( < HTMLCanvasElement > document.getElementById('air-quality')).remove();
		( < HTMLCanvasElement > document.getElementById('noise-level')).remove();
	}
}
