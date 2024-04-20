import { Component } from '@angular/core';
import { Prestamo } from 'src/app/models/prestamo/prestamo';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent {
  prestamos:Prestamo[]=[]

  constructor(private prestamoService:PrestamoService){
    this.prestamoService.getPrestamos().subscribe(res=>{
      this.prestamos=res
    })
  }
}
