import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/models/empresa.model';
import { TipoRiesgo } from 'src/app/models/tipoRiesgo.model';
import { EmpresaService } from 'src/app/services/empresa.service';
import { TipoRiesgoService } from 'src/app/services/tipoRiesgo.service';
import Swal from 'sweetalert2'
import { CrudEmpresaAddComponent } from '../crud-empresa-add/crud-empresa-add.component';
import { CrudEmpresaUpdateComponent } from '../crud-empresa-update/crud-empresa-update.component';

@Component({
  selector: 'app-crud-empresa',
  templateUrl: './crud-empresa.component.html',
  styleUrls: ['./crud-empresa.component.css']
})
export class CrudEmpresaComponent implements OnInit {

   //Para Tipo de Riesgo
   tiposRiesgo: TipoRiesgo[] = [];;

   
   //Grila
  dataSource:any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  displayedColumns = ["idEmpresa","contacto","email","flag","razonSocial","ruc","idTipoRiesgo",'actions'];

  constructor(private formBuilder: FormBuilder,  
              private dialogService: MatDialog,
              private empresaService:EmpresaService, 
              private tipoRiesgoService:TipoRiesgoService) {  
  }

  
  openAddDialog() {
    console.log(">>> openAddDialog  >>");
    const dialogRef = this.dialogService.open(CrudEmpresaAddComponent);
    dialogRef.afterClosed().subscribe(result => {
        console.log(">>> result >> " + result);
        if (result === 1) {
            this.refreshTable();
        }
    });
  }

 ngOnInit(): void {}

 listarEmpresa(){
      this.refreshTable();
 }



  elimina(obj:Empresa){
          Swal.fire({
            title: '¿Desea eliminar?',
            text: "Los cambios no se van a revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, elimina',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
                if (result.isConfirmed) {
                    this.empresaService.elimina(obj.idEmpresa || 0).subscribe(
                          x => {
                                Swal.fire('Mensaje', x.mensaje, 'info');
                                this.refreshTable();
                          }
                    );
                }
          })   
   }

   actualizaEstado(obj:Empresa){
      obj.flag = obj.flag == 1? 0 : 1;  
      this.empresaService.actualiza(obj).subscribe();
   }

   openUpdateDialog(obj:Empresa) {
    const dialogRef = this.dialogService.open(CrudEmpresaUpdateComponent, {data:obj});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
            this.refreshTable();
      }
    });
   
}


private refreshTable() {
  this.empresaService.listar().subscribe(
    x => {
      this.dataSource = new MatTableDataSource<Empresa>(x);
      this.dataSource.paginator = this.paginator; 
    }
  );
}
}