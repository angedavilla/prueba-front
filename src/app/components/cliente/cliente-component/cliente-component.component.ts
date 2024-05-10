import { Component, OnInit } from '@angular/core';
import { ClienteServiceService } from '../../../services/cliente/cliente-service.service';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interface/cliente';

@Component({
  selector: 'app-cliente-component',
  templateUrl: './cliente-component.component.html',
  styleUrls: ['./cliente-component.component.css']
})
export class ClienteComponentComponent {

  public tipoDocumento: string;
  public numeroDocumento: string;
  public isButtonDisabled: boolean;
  public error!: string;

  constructor(
    private clienteServiceService: ClienteServiceService,
    private router: Router
  ) {
    this.tipoDocumento = '';
    this.numeroDocumento = '';
    this.isButtonDisabled = true;
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (target.id === 'tipoDocumento') {
      this.tipoDocumento = value;
      this.isButtonDisabled = !(this.tipoDocumento === 'C' || this.tipoDocumento === 'P');
    } else if (target.id === 'numeroDocumento') {
      this.numeroDocumento = value;
    }

    const isTipoDocumentoValido = this.tipoDocumento === 'C' || this.tipoDocumento === 'P';
    const isNumeroDocumentoValido = this.numeroDocumento.length >= 8;

    this.isButtonDisabled = !(isTipoDocumentoValido && isNumeroDocumentoValido);
  }

  validateFormat(event: KeyboardEvent): void {
    const regex = /^[0-9]*$/;
    const inputValue = (event.target as HTMLInputElement).value + event.key;

    if (!regex.test(inputValue)) {
      event.preventDefault();
    }
  }

  buscarCliente() {
    this.clienteServiceService.getCliente(this.tipoDocumento, this.numeroDocumento)
      .subscribe(
        (cliente: Cliente) => {
          this.router.navigate(['/resumen'], { queryParams: { tipoDocumento: this.tipoDocumento, numeroDocumento: this.numeroDocumento } });
        },
        (error) => {
          this.error = 'Error al buscar el cliente. Por favor, verifica tu Número de identificación o el Tipo de documento.';
        }
      );
  }

}
