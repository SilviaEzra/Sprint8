import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Interface } from '../interface';
import { ServicioService } from '../servicio.service';
import { ProgressBarComponent } from '../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-addedit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class AddeditComponent implements OnInit {
  
  form!: FormGroup; // Use the non-null assertion operator
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar'

  constructor(private fb: FormBuilder,
              private _productService: ServicioService,
              private router: Router,
              private aRouter: ActivatedRoute) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    this.initializeForm(); // Initialize form in constructor
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.getProduct(this.id);
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      nota: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      ubicacion: ['', Validators.required]
    });
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Interface) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        nombre: data.nombre,
        tipo: data.tipo,
        nota: data.nota,
        ubicacion: data.ubicacion
      });
    });
  }

  addScapeRoom() {
    const scapeRoom: Interface = {
      nombre: this.form.value.nombre,
      tipo: this.form.value.tipo,
      nota: this.form.value.nota,
      ubicacion: this.form.value.ubicacion
    };

    this.loading = true;

    if (this.id !== 0) {
      // Es editar
      scapeRoom.id = this.id;
      this._productService.updateProduct(this.id, scapeRoom).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/lista']);
      });
    } else {
      // Es agregar
      this._productService.saveProduct(scapeRoom).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/lista']);
      });
    }
  }
}
