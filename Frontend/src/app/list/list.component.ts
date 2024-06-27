import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { Interface } from '../interface';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressBarComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listScapeRoom: Interface[] = [];
  loading: boolean = false;

  constructor(private _servicioService: ServicioService) {}

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this.loading = true;
    this._servicioService.getListProducts().subscribe((data: Interface[]) => {
      this.listScapeRoom = data.map(item => {
        if (item.nota > 10) {
          item.nota = 10; // Ajustar la nota si es mayor a 10
        }
        return item;
      });
      this.loading = false;
    });
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._servicioService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
    });
  }
}
