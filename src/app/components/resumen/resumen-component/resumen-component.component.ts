import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interface/cliente';
import { ClienteServiceService } from 'src/app/services/cliente/cliente-service.service';

@Component({
  selector: 'app-resumen-component',
  templateUrl: './resumen-component.component.html',
  styleUrls: ['./resumen-component.component.css']
})
export class ResumenComponentComponent implements OnInit {

  public cliente: Cliente;

  constructor(
    private route: ActivatedRoute,
    private clienteServiceService: ClienteServiceService,
    private router: Router) {
    this.cliente = {} as Cliente;
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.cliente.tipoDocumento = params['tipoDocumento'];
      this.cliente.numeroDocumento = params['numeroDocumento'];

      this.clienteServiceService.getCliente(this.cliente.tipoDocumento, this.cliente.numeroDocumento)
        .subscribe(
          (cliente: Cliente) => {
            this.cliente = cliente;
          },
          (error) => {
            console.error('Error al obtener el cliente:', error);
          }
        );
    });

  }

  volver(): void {
    this.router.navigate(['/']);
  }

}
