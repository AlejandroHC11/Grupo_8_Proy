import { Component } from '@angular/core';
import { Prestamo } from 'src/app/models/prestamo/prestamo';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  importe!: number
  sede!: String
  moneda!: String
  cuotas!:number

  constructor(private prestamoService:PrestamoService){}
  
  getData(){
    if(this.importe == null || this.sede=='' || this.moneda == '' || this.cuotas== null){
      alert('No se ingresaron todos los datos')
      return false
    }
    var prestamo = {'importe': this.importe, 'sede':this.sede, 'moneda':this.moneda, 'cuotas':this.cuotas, 'estado':'Pendiente'}
    this.prestamoService.createPrestamo(prestamo).subscribe(res => {
      alert('Se generó la solicitud de prestamo')
    })
  }
}
