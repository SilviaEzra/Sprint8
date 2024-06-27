import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ServicioService } from '../servicio.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotasComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartData: ChartConfiguration['data'] = {
    labels: this.barChartLabels,
    datasets: [
      { data: [], label: 'Notas' }
    ]
  };
  public barChartType: ChartType = 'bar';

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public lineChartLabels: string[] = [];
  public lineChartData: ChartConfiguration['data'] = {
    labels: this.lineChartLabels,
    datasets: [
      { data: [], label: 'Notas' }
    ]
  };
  public lineChartType: ChartType = 'line';

  constructor(private servicioService: ServicioService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.servicioService.getListProducts().subscribe(products => {
      products.forEach(product => {
        this.barChartLabels.push(product.nombre);
        this.lineChartLabels.push(product.nombre);
        (this.barChartData.datasets[0].data as number[]).push(product.nota);
        (this.lineChartData.datasets[0].data as number[]).push(product.nota);
      });

      // Mark for check to detect changes
      this.cdr.detectChanges();
    });
  }
}
