import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoRiesgo } from '../models/tipoRiesgo.model';
import { AppSettings } from '../app.settings';

const baseUrl =  AppSettings.API_MONGODB + "/TipoRiesgo";

@Injectable({
  providedIn: 'root'
})

export class TipoRiesgoService {
  constructor(private http: HttpClient) {}

  listaTiposRiesgo(): Observable<TipoRiesgo[]> {
    return this.http.get<TipoRiesgo[]>(baseUrl);
  }
}
