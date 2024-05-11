import { Component } from '@angular/core';
import { PrestamoService } from '../services/prestamo.service';
import { AuthService } from '../services/services/auth.service';
import { UserStoreService } from '../services/user-store.service';
import { Prestamo } from '../models/prestamo/prestamo';
import { ApiService } from '../services/services/api.service';
import { Users } from '../models/users/users';
import { PrestatarioService } from '../services/prestatario.service';
import { forkJoin } from 'rxjs';

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
  user:any[]=[];
  prestamos:any[]=[];
  userDetails: Users = new Users();
  public fullName :  string = "";
  public idUserPrestamista :  string = "";
  public idPrestariostore : number = 0 ;

  filterTabla: any = {};
  filterPrestatario: string = '';
  filterFechaDesde: Date | null = null;
  filterFechaHasta: Date | null = null;
  
  constructor(private prestatarioService: PrestatarioService, private prestamoService:PrestamoService,private apiService: ApiService, private auth: AuthService, private userStore: UserStoreService){
  }
  async ngOnInit(){
   
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

   this.prestamoService.getPrestamoByIdPrestamista(parseInt(this.idUserPrestamista)).subscribe(prestamos => {
    this.prestamos = prestamos;

    const userObservables = this.prestamos.map((prestamo: any) => {
      return this.apiService.getUserById(prestamo.idPrestatario);
    });
  
    forkJoin(userObservables).subscribe(users => {
      this.user = users;
    });
    
    });

 }

 loadUserData(): void {
  if (this.idPrestariostore !== undefined) {
    this.apiService.getUserById(this.idPrestariostore).subscribe({
      next: (userData) => {
        console.log("Datos del usuario:", userData);
        // Aquí puedes asignar los datos recibidos a una propiedad para su uso en el template o en lógica adicional
        this.userDetails = userData;
        //this.filter.fullNombres = `${userData.firstName} ${userData.lastName}`;
        
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

  onFilter() {
    if (this.filterPrestatario || this.filterFechaDesde || this.filterFechaHasta) {
      this.prestamoService.getPrestamoByIdPrestamista(parseInt(this.idUserPrestamista)).subscribe(prestamos => {
        forkJoin(
          prestamos.map((prestamo: any) => {
            return this.apiService.getUserById(prestamo.idPrestatario);
          })
        ).subscribe(users => {
          this.prestamos = prestamos.filter((prestamo: any, index: number) => {
            const user = users[index];
            return this.filterMatches(user, prestamo);
          });
  
          this.user = this.user.filter(user => {
            return this.filterMatches(user);
          });
        });
      });
    } else {
      this.prestamoService.getPrestamoByIdPrestamista(parseInt(this.idUserPrestamista)).subscribe(prestamos => {
        this.prestamos = prestamos;
  
        const userObservables = this.prestamos.map((prestamo: any) => {
          return this.apiService.getUserById(prestamo.idPrestatario);
        });
  
        forkJoin(userObservables).subscribe(users => {
          this.user = users;
        });
  
      });
    }
  }
  
  filterMatches(user: any, prestamo?: any): boolean {
    let prestatarioMatch = true;
    let fechaDesdeMatch = true;
    let fechaHastaMatch = true;
  
    if (this.filterPrestatario) {
      prestatarioMatch = user.firstName === this.filterPrestatario || user.lastName === this.filterPrestatario || (user.firstName + " " + user.lastName) === this.filterPrestatario.trim();
    }
  
    if (prestamo && this.filterFechaDesde) {
      fechaDesdeMatch = new Date(prestamo.fechaIniVigencia) >= new Date(this.filterFechaDesde);
    }
  
    if (prestamo && this.filterFechaHasta) {
      fechaHastaMatch = new Date(prestamo.fechaFinVigencia) <= new Date(this.filterFechaHasta);
    }
  
    return prestatarioMatch && fechaDesdeMatch && fechaHastaMatch;
  }

  verSolicitud(prestamo: Prestamo): void {
    this.solicitudSeleccionada = prestamo;
  }

  cerrarModal(): void {
    this.solicitudSeleccionada = null;
  }

  aprobarSolicitud(): void {
   if (this.solicitudSeleccionada && this.solicitudSeleccionada.nroPrestamo !== undefined) {
    const solicitudId = this.solicitudSeleccionada.nroPrestamo;
    this.prestamoService.updateEstadoPrestamo(solicitudId, 'APROBADO').subscribe({
      next: (res) => {
        console.log('Solicitud aprobada:', res);
        this.updatePrestamoInList(res);
        this.solicitudSeleccionada = null;
      },
      error: (err) => console.error('Error al aprobar la solicitud:', err)
    });
   }
  }

  rechazarSolicitud(): void {
  if (this.solicitudSeleccionada && this.solicitudSeleccionada.nroPrestamo !== undefined) {
    this.prestamoService.updateEstadoPrestamo(this.solicitudSeleccionada.nroPrestamo, 'RECHAZADO')
      .subscribe({
        next: (res) => {
          console.log('Solicitud rechazada:', res);
          this.updatePrestamoInList(res);
          this.solicitudSeleccionada = null;
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