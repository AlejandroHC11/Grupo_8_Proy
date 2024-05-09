import { Component } from '@angular/core';
import { PrestamoService } from '../services/prestamo.service';
import { AuthService } from '../services/services/auth.service';
import { UserStoreService } from '../services/user-store.service';
import { Prestamo } from '../models/prestamo/prestamo';

interface Solicitud {
  numero: string;
  prestatario: string;
  prestamista: string;
  monto: number;
  cuota: number;
  interes: number;
  tasa: number;
}
@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent {
  filter = {
    prestatario: '',
    fechaDesde: '',
    fechaHasta: ''
  };

  solicitudes: Solicitud[] = [
    {
      numero: 'S0001',
      prestatario: 'Luis Quispe',
      prestamista: 'Jorge',
      monto: 1000,
      cuota: 50,
      interes: 5,
      tasa: 10
    }
  ];
  prestamos:Prestamo[]=[]
  public fullName :  string = "";
  public idUserPrestamista :  string = "";
  
  constructor(private prestamoService:PrestamoService, private auth: AuthService, private userStore: UserStoreService){
  }
  ngOnInit(){
   
    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
     let fullNameFromToken = this.auth.getfullNameFromToker();
     this.fullName = val || fullNameFromToken
    }) 
    // Cargar el idUser desde el LocalStorage y asignarlo al formulario
   const idUser = this.userStore.getIdUserFromStore();
   if (idUser) {
       this.idUserPrestamista = idUser;
   }
 
    this.prestamoService.getPrestamoByIdPrestamista(parseInt(this.idUserPrestamista)).subscribe(res=>{
     this.prestamos=res
   })
 }
  
 
  solicitudSeleccionada: Prestamo | null = null;

  onFilter(): void {
    // Lógica para filtrar solicitudes
    console.log('Filtro:', this.filter);
  }

  verSolicitud(prestamo: Prestamo): void {
    this.solicitudSeleccionada = prestamo;
  }

  cerrarModal(): void {
    this.solicitudSeleccionada = null;
  }

  aprobarSolicitud(): void {
    if (this.solicitudSeleccionada) {
      // Lógica para aprobar la solicitud
      console.log('Aprobar solicitud:', this.solicitudSeleccionada);
      // Simula el cambio de estado a "APROBADO"
      this.solicitudSeleccionada = null;
    }
  }

  rechazarSolicitud(): void {
    if (this.solicitudSeleccionada) {
      // Lógica para rechazar la solicitud
      console.log('Rechazar solicitud:', this.solicitudSeleccionada);
      // Simula el cambio de estado a "CANCELADO"
      this.solicitudSeleccionada = null;
    }
  }
}
