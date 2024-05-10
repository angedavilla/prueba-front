import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ResumenComponentComponent } from './resumen-component.component';
import { Cliente } from 'src/app/interface/cliente';
import { ClienteServiceService } from 'src/app/services/cliente/cliente-service.service';

describe('ResumenComponentComponent', () => {
  let component: ResumenComponentComponent;
  let fixture: ComponentFixture<ResumenComponentComponent>;
  let clienteService: jasmine.SpyObj<ClienteServiceService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(() => {
    const clienteServiceSpy = jasmine.createSpyObj('ClienteServiceService', ['getCliente']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      queryParams: of({ tipoDocumento: 'C', numeroDocumento: '123456789' })
    });

    TestBed.configureTestingModule({
      declarations: [ResumenComponentComponent],
      providers: [
        { provide: ClienteServiceService, useValue: clienteServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenComponentComponent);
    component = fixture.componentInstance;
    clienteService = TestBed.inject(ClienteServiceService) as jasmine.SpyObj<ClienteServiceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    consoleErrorSpy = spyOn(console, 'error').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch client data and assign it to cliente property on initialization', () => {
    const clienteTest: Cliente = {
      primerNombre: 'Ángel',
      segundoNombre: 'David',
      primerApellido: 'Villamil',
      segundoApellido: 'Méndez',
      telefono: '321654987',
      direccion: 'Calle 123',
      ciudadResidencia: 'Bogotá',
      tipoDocumento: 'C',
      numeroDocumento: '123456789'
    };

    clienteService.getCliente.and.returnValue(of(clienteTest));

    fixture.detectChanges();

    expect(component.cliente).toEqual(clienteTest);
  });

  it('should handle error when client data cannot be fetched', () => {
    const errorMessage = 'Error al obtener el cliente';
    clienteService.getCliente.and.returnValue(throwError(errorMessage));

    fixture.detectChanges();

    expect(consoleErrorSpy).toHaveBeenCalledWith(`${errorMessage}:`, errorMessage);
  });

  it('should navigate back to home page when volver() is called', () => {
    component.volver();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
