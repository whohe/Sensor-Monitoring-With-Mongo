import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-temperature-and-humidity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temperature-and-humidity.component.html',
  styleUrl: './temperature-and-humidity.component.css'
})
export class TemperatureAndHumidityComponent implements AfterViewInit, OnDestroy {
	chart: any = []
	temperature_average = 0;
	humidity_average = 0;
  constructor(private authService: AuthService) {
		this.authService.isLogged=true;
  }

	ngAfterViewInit() {
		fetch('http://localhost:3000/weather')
		.then((response) => response.json())
		.then((json) => {
			var labels=[]
			var temperature=[]
			var humidity=[]
			for (let i=0;i<json.length;i++){
				var date = new Date(0);
				date.setUTCSeconds(json[i]['timestamp']);
				var dateStr=formatDate(date,'yyyy-MM-dd HH:mm',"en-US");
				labels.push(dateStr);
				temperature.push(json[i]['temperature']);
				humidity.push(json[i]['humidity']);
			}
			this.temperature_average=temperature.reduce((a, b) => a + b, 0)/12;
			this.humidity_average=humidity.reduce((a, b) => a + b, 0)/12;
			this.chart = new Chart('temperature-and-humidity', {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Temperatura',
							data: temperature,
							borderWidth: 1,
						},
						{
							label: 'Humedad',
							data: humidity,
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
    });
	}
	ngOnDestroy(){
		( < HTMLCanvasElement > document.getElementById('temperature-and-humidity')).remove();
	}
}
