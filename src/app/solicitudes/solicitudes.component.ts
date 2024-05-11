import { Component } from '@angular/core';
import { PrestamoService } from '../services/prestamo.service';
import { AuthService } from '../services/services/auth.service';
import { UserStoreService } from '../services/user-store.service';
import { Prestamo } from '../models/prestamo/prestamo';
import { ApiService } from '../services/services/api.service';
import { Users } from '../models/users/users';

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
    fechaHasta: '',
    fullNombres:''
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
  prestamos:Prestamo[]=[];
  userDetails: Users = new Users();
  public fullName :  string = "";
  public idUserPrestamista :  string = "";
  public idPrestariostore : number = 0 ;
  
  constructor(private prestamoService:PrestamoService,private apiService: ApiService, private auth: AuthService, private userStore: UserStoreService){
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
     this.prestamos=res;
       // Verificando que el array no está vacío y que el primer elemento tiene un idPrestatario definido
    if (this.prestamos.length > 0 && this.prestamos[0].idPrestatario !== undefined) {
      this.idPrestariostore = this.prestamos[0].idPrestatario;
      this.loadUserData();
   //   console.log("idPrestamistastore almacenado: ", this.idPrestariostore);
    }
    
   })

 }

 loadUserData(): void {
  if (this.idPrestariostore !== undefined) {
    this.apiService.getUserById(this.idPrestariostore).subscribe({
      next: (userData) => {
        console.log("Datos del usuario:", userData);
        // Aquí puedes asignar los datos recibidos a una propiedad para su uso en el template o en lógica adicional
        this.userDetails = userData;
        this.filter.fullNombres = `${userData.firstName} ${userData.lastName}`;
        
      },
      error: (error) => {
        console.error("Error al obtener datos del usuario:", error);
      }
    });
  } else {
    console.log("ID de prestamista no definido");
  }
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
   // Verificar que solicitudSeleccionada y nroPrestamo no sean undefined
   if (this.solicitudSeleccionada && this.solicitudSeleccionada.nroPrestamo !== undefined) {
    const solicitudId = this.solicitudSeleccionada.nroPrestamo;
    this.prestamoService.updateEstadoPrestamo(solicitudId, 'APROBADO').subscribe({
      next: (res) => {
        console.log('Solicitud aprobada:', res);
        this.updatePrestamoInList(res); // Actualizar la lista de préstamos
        this.solicitudSeleccionada = null;
        // Agrega aquí más lógica si es necesario
      },
      error: (err) => console.error('Error al aprobar la solicitud:', err)
    });
   }
  }

  rechazarSolicitud(): void {
     // Verificar que solicitudSeleccionada y nroPrestamo no sean undefined
  if (this.solicitudSeleccionada && this.solicitudSeleccionada.nroPrestamo !== undefined) {
    this.prestamoService.updateEstadoPrestamo(this.solicitudSeleccionada.nroPrestamo, 'RECHAZADO')
      .subscribe({
        next: (res) => {
          console.log('Solicitud rechazada:', res);
          this.updatePrestamoInList(res); // Actualizar la lista de préstamos
          this.solicitudSeleccionada = null;
          // Agrega aquí más lógica si es necesario
        },
        error: (err) => console.error('Error al rechazar la solicitud:', err)
      });
   }
  }
  updatePrestamoInList(updatedPrestamo: Prestamo): void {
    const index = this.prestamos.findIndex(p => p.nroPrestamo === updatedPrestamo.nroPrestamo);
    if (index !== -1) {
      this.prestamos[index] = updatedPrestamo;
    }
  }
}
