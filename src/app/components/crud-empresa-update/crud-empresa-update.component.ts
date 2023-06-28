import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empresa } from 'src/app/models/empresa.model';
import {EmpresaService} from 'src/app/services/empresa.service';
import { TipoRiesgo } from 'src/app/models/tipoRiesgo.model';
import { TipoRiesgoService } from 'src/app/services/tipoRiesgo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud-empresa-update',
  templateUrl: './crud-empresa-update.component.html',
  styleUrls: ['./crud-empresa-update.component.css']
})
export class CrudEmpresaUpdateComponent {

  formsActualiza = this.formBuilder.group({
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

  //Para el ubigeo
  tiposRiesgo: TipoRiesgo[] = [];;

  constructor(public dialogRef: MatDialogRef<CrudEmpresaUpdateComponent>,
              private formBuilder: FormBuilder,
              private empresaService:EmpresaService, 
              private tipoRiesgoService:TipoRiesgoService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.empresa = data;            
    this.tipoRiesgoService.listaTiposRiesgo().subscribe(
        response => this.tiposRiesgo = response
    );          
}

onNoClick(): void {
  this.dialogRef.close();
}


actualiza(){
  /*
  if (this.formsActualiza.valid){*/
      this.empresaService.actualiza(this.empresa).subscribe(
            x => { 
              Swal.fire('Mensaje', x.mensaje, 'info'); 
            }   
      );
    /*}*/
}

}
