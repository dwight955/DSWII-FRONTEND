import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa.model';
import { AppSettings } from '../app.settings';

const baseUrl =  AppSettings.API_ENDPOINT + "/Empresa";
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
 
  constructor(private http:HttpClient) { }
 
  listar():Observable<Empresa[]>{
      return  this.http.get<Empresa[]>(baseUrl); 
  }  

  inserta(obj:Empresa):Observable<any>{
      return this.http.post(baseUrl, obj);
  }

  actualiza(obj:Empresa):Observable<any>{
      return this.http.put(baseUrl, obj);
  }

  elimina(idEmpresa:number):Observable<any>{
      return this.http.delete(baseUrl + "/"+ idEmpresa);
  }

}
