import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-noise-level-and-air-quality',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noise-level-and-air-quality.component.html',
  styleUrl: './noise-level-and-air-quality.component.css'
})
export class NoiseLevelAndAirQualityComponent {
	airQuality: any = []
	noiseLevel: any = []
	noise_level_average = 0;
	air_quality_average = 0;
  constructor(private authService: AuthService) {
		this.authService.isLogged=true;
  }
	ngOnInit() {
		fetch('http://localhost:3000/ambient')
		.then((response) => response.json())
		.then((json) => {
			var labels=[]
			var noise_level=[]
			var air_quality=[]
			for (let i=0;i<json.length;i++){
				var date = new Date(0);
				date.setUTCSeconds(json[i]['timestamp']);
				var dateStr=formatDate(date,'yyyy-MM-dd HH:mm',"en-US");
				labels.push(dateStr);
				noise_level.push(json[i]['noise_level']);
				air_quality.push(json[i]['air_quality']);
			}
			this.noise_level_average=noise_level.reduce((a, b) => a + b, 0)/12;
			this.air_quality_average=air_quality.reduce((a, b) => a + b, 0)/12;
			this.airQuality = new Chart('air-quality', {
				type: 'line',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Calidad del Aire',
							data: air_quality,
							borderWidth: 1,
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
			this.airQuality.canvas.parentNode.style.height = '450px';
			this.noiseLevel = new Chart('noise-level', {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Nivel de Ruido',
							data: noise_level,
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
			this.noiseLevel.canvas.parentNode.style.height = '450px';
    });
	}
	ngOnDestroy(){
		( < HTMLCanvasElement > document.getElementById('air-quality')).remove();
		( < HTMLCanvasElement > document.getElementById('noise-level')).remove();
	}
}
