import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Prestamo } from 'src/app/models/prestamo/prestamo';

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
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent {
  @Input() prestamo: Prestamo | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() aprobar = new EventEmitter<void>();
  @Output() rechazar = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onAprobar(): void {
    this.aprobar.emit();
  }

  onRechazar(): void {
    this.rechazar.emit();
  }
}
