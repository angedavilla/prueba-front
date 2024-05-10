import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cliente } from 'src/app/interface/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  public getCliente(tipoDocumento: string, numeroDocumento: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${tipoDocumento}/${numeroDocumento}`).pipe(
      map((cliente: Cliente) => cliente || null)
    );
  }

}
