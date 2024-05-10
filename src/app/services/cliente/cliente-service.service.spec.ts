import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteServiceService } from './cliente-service.service';
import { Cliente } from 'src/app/interface/cliente';
import { environment } from 'src/environments/environment';

describe('ClienteServiceService', () => {
  let service: ClienteServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteServiceService]
    });
    service = TestBed.inject(ClienteServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve client data by calling getCliente', () => {
    const clienteTest: Cliente = {
      primerNombre: 'Ángel',
      segundoNombre: 'David',
      primerApellido: 'Villamil',
      segundoApellido: 'Méndez',
      telefono: '321654987',
      direccion: 'Calle 123',
      ciudadResidencia: 'Bogotá',
      tipoDocumento: 'C',
      numeroDocumento: '1234567890'
    };


    const tipoDocumento = 'C';
    const numeroDocumento = '1234567890';

    service.getCliente(tipoDocumento, numeroDocumento).subscribe(cliente => {
      expect(cliente).toEqual(clienteTest);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/${tipoDocumento}/${numeroDocumento}`);
    expect(req.request.method).toBe('GET');
    req.flush(clienteTest);
  });

  it('should return null if client data is not found', () => {
    const tipoDocumento = 'C';
    const numeroDocumento = '1234567890';

    service.getCliente(tipoDocumento, numeroDocumento).subscribe(cliente => {
      expect(cliente).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/${tipoDocumento}/${numeroDocumento}`);
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });
});
