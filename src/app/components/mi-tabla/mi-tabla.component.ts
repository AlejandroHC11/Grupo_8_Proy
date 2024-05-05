import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Prestamo } from 'src/app/models/prestamo/prestamo';
import { PrecioService } from 'src/app/services/precio.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { ApiService } from 'src/app/services/services/api.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-mi-tabla',
  templateUrl: './mi-tabla.component.html',
  styleUrls: ['./mi-tabla.component.css']
})
export class MiTablaComponent implements OnInit {


  data: any[] = [];

  public users:any = [];
  public role!:string;
  public fullName :  string = "";
  minDate: string;
  selectedValue: number = 0;
  selectedDuration: string = '';
  startDate: string = new Date().toISOString().split('T')[0];
  endDate: string = '';
  dailyPayment: number = 0;
  selectedCell: { row: number, column: number } = { row: -1, column: -1 };
  constructor(private precioService: PrecioService, private prestamoService: PrestamoService,private userStore: UserStoreService,private api : ApiService, private auth: AuthService,private toastr: ToastrService,) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];  // Convierte la fecha actual a formato AAAA-MM-DD
  }

  ngOnInit(){
    this.api.getUsers()
    .subscribe((res: any)=>{
      this.users = res;
    });

    this.precioService.getPrecio()
     .subscribe(val => {
      this.data = val;
      console.log(val)
     })

   this.userStore.getFullNameFromStore()
   .subscribe((val: any)=>{
    const fullNameFromToken = this.auth.getfullNameFromToker();
    this.fullName = val || fullNameFromToken
   }) 

   this.userStore.getRoleFromStore()
   .subscribe((val: any) => {
    const roleFromToken = this.auth.getRolFromToker();
    this.role = val || roleFromToken;
   })
   
}
  onRegistrar(): void {

    const match = this.selectedDuration.match(/\d+/); // Buscar dígitos en la cadena
    if (!match) {
      console.error('No se encontraron dígitos en selectedDuration');
      return; // Salir de la función si no se encuentran dígitos
    }
    const idUser = this.userStore.getIdUserFromStore(); // Asume que userStore es accesible y tiene el método correcto

    const prestamoData = {
      monto: this.selectedValue,
      fechaIniVigencia: this.startDate,
      fechaFinVigencia: this.endDate,
      diasDuracion: parseInt(match[0]),
      pagoDiario: this.dailyPayment,
      IdPrestatario: idUser
    };

    this.prestamoService.createPrestamo(prestamoData).subscribe({
      next: (response: any) => {
        
        this.toastr.success("Préstamo registrado",'SUCCESS')
        console.log('Préstamo registrado:', response);
        // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
        /*next:(res) =>{
          console.log(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.auth.storeIdUser(res.usuario.id);
          const tokernPayload = this.auth.decodedToker();
          this.userStore.setFullNameForStore(tokernPayload.name);
          this.userStore.setRoleForStore(tokernPayload.role);

          this.toastr.success("Préstamo registrado",'SUCCESS')
          this.router.navigate(['dashboard'])
        },*/
      },
      error: (error: any) => {
        console.error('Error al registrar el préstamo:', error);
        // Manejar el error, mostrar un mensaje, etc.
      }
    });
  }

  onCellClick(row: number, column: number, duration: string, value: number): void {
    this.selectedCell = { row, column };
    this.selectedValue = value;
    this.selectedDuration = duration;
    this.calculateEndDate(); // Si no existe, debes crearla
    this.updatePaymentDetails(); // Asegura que el pago diario se recalcule
  }
  calculateEndDate(): void {
    if (!this.startDate || !this.selectedDuration) return;
    
    const match = this.selectedDuration.match(/\d+/);
    if (!match) {
      console.error('No se encontraron números en selectedDuration');
      return;
    }
    const durationDays = parseInt(match[0]); // Asegúrate de que este código esté manejando correctamente la extracción de los números
    const startDate = new Date(this.startDate);
    const endDate = new Date(startDate);
  
    endDate.setDate(startDate.getDate() + durationDays);
  
    this.endDate = endDate.toISOString().split('T')[0];
  }
  onStartDateChange(): void {
    if (!this.startDate || !this.selectedDuration) return;

    const match = this.selectedDuration.match(/\d+/);
    if (!match) {
      console.error('No se encontraron números en selectedDuration');
      return;
    }
  
    const durationDays = parseInt(match[0]);
    const startDate = new Date(this.startDate);
    const endDate = new Date(startDate);
  
    endDate.setDate(startDate.getDate() + durationDays);
  
    this.endDate = endDate.toISOString().split('T')[0];
    this.updatePaymentDetails(); // Asegúrate de llamar a updatePaymentDetails para recalcular el pago diario.
  }
  updatePaymentDetails(): void {
    if (!this.startDate || !this.endDate) return;
  
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
  
    const workingDays = this.calculateWorkingDays(start, end);
    this.dailyPayment = workingDays > 0 ? this.selectedValue / workingDays : 0;
    this.dailyPayment = parseFloat(this.dailyPayment.toFixed(2));
  }

  //calculo del PAGO DIARIO 
  calculateWorkingDays(startDate: Date, endDate: Date): number {
    let count = 0;
    let curDate = new Date(startDate.getTime());
  
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Domingo, 6 = Sábado
        count++;
      }
      curDate.setDate(curDate.getDate() + 1); // Siguiente día
    }
  
    return count;
  }
}