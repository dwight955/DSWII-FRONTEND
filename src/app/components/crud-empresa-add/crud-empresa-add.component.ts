import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Empresa } from 'src/app/models/empresa.model';
import { TipoRiesgo } from 'src/app/models/tipoRiesgo.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { TipoRiesgoService } from 'src/app/services/tipoRiesgo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-empresa-add',
  templateUrl: './crud-empresa-add.component.html',
  styleUrls: ['./crud-empresa-add.component.css']
})
export class CrudEmpresaAddComponent {


   
    tiposRiesgo: TipoRiesgo[] = [];;

    formsRegistra = this.formBuilder.group({
      validaContacto: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ ]{3,30}')]],
      validaEmail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      validaRazonSocial: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{3,30}')]],
      validaRuc: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      validaTipoRiesgo: ['', [Validators.min(1)]],
      validaFlag: ['', [Validators.min(0)]]
    });

    //Json para registrar o actualizar
    empresa: Empresa = { 
      
    };

    constructor(public dialogRef: MatDialogRef<CrudEmpresaAddComponent>,
              private formBuilder: FormBuilder,
              private EmpresaService:EmpresaService, 
              private tipoRiesgoService:TipoRiesgoService) {
        this.tipoRiesgoService.listaTiposRiesgo().subscribe(
            response => this.tiposRiesgo = response
        );         
   }

  onNoClick(): void {
        this.dialogRef.close();
  }
  registra(){
    /*
        if (this.formsRegistra.valid){*/
              this.EmpresaService.inserta(this.empresa).subscribe(
                    x => { 
                              Swal.fire('Mensaje', x.mensaje, 'info'); 
                              this.empresa = { 
                                contacto: "",
                                email:"",
                                razonSocial:"",
                                ruc:"",
                                idTipoRiesgo:-1
                              };
                          }   
              );
              
        /*}*/
  }   


}
