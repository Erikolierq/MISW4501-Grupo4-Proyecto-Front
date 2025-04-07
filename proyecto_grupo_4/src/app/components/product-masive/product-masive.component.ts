import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: true,
  selector: 'app-product-masive',
  templateUrl: './product-masive.component.html',
  styleUrls: ['./product-masive.component.scss']
})
export class ProductMasiveComponent {
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      this.selectedFile = file;
    } else {
      alert('Formato no válido. Debe ser .csv o .xlsx');
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Por favor selecciona un archivo válido.');
      return;
    }

    this.productService.uploadCSV(this.selectedFile).subscribe({
      next: (res) => {
        alert(`Carga completada: ${res.enviados_a_cola || 0} productos enviados.`);
        if (res.errores && res.errores.length > 0) {
          console.warn('Errores:', res.errores);
        }
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.error('Error al subir archivo:', err);
        alert('Error al procesar el archivo.');
      }
    });
  }

  volver() {
    this.router.navigate(['/productos']);
  }
}
