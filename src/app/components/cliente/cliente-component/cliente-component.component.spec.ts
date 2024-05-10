import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ClienteComponentComponent } from './cliente-component.component';
import { ClienteServiceService } from '../../../services/cliente/cliente-service.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ClienteComponentComponent', () => {
  let component: ClienteComponentComponent;
  let fixture: ComponentFixture<ClienteComponentComponent>;
  let clienteService: jasmine.SpyObj<ClienteServiceService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const clienteServiceSpy = jasmine.createSpyObj('ClienteServiceService', ['getCliente']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ClienteComponentComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: ClienteServiceService, useValue: clienteServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    clienteService = TestBed.inject(ClienteServiceService) as jasmine.SpyObj<ClienteServiceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the button when fields are empty', () => {
    component.onInputChange({ target: { id: 'tipoDocumento', value: '' } } as any);
    component.onInputChange({ target: { id: 'numeroDocumento', value: '' } } as any);
    expect(component.isButtonDisabled).toBe(true);
  });

  it('should enable the button when fields are filled', () => {
    component.onInputChange({ target: { id: 'tipoDocumento', value: 'C' } } as any);
    component.onInputChange({ target: { id: 'numeroDocumento', value: '12345678' } } as any);
    expect(component.isButtonDisabled).toBe(false);
  });

  it('should call buscarCliente and navigate to ResumenComponent on successful client search', () => {
    const clienteTest = {
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

    component.tipoDocumento = 'C';
    component.numeroDocumento = '123456789';
    component.buscarCliente();

    expect(clienteService.getCliente).toHaveBeenCalledWith('C', '123456789');
    expect(router.navigate).toHaveBeenCalledWith(['/resumen'], { queryParams: { tipoDocumento: 'C', numeroDocumento: '123456789' } });
  });

  it('should handle error when client search fails', () => {
    clienteService.getCliente.and.returnValue(throwError('Error'));

    component.tipoDocumento = 'C';
    component.numeroDocumento = '123456789';
    component.buscarCliente();

    expect(clienteService.getCliente).toHaveBeenCalledWith('C', '123456789');
    expect(component.error).toBe('Error al buscar el cliente. Por favor, inténtalo de nuevo más tarde.');
  });
});
