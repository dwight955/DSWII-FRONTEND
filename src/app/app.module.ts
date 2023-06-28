import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudEmpresaComponent } from './components/crud-empresa/crud-empresa.component';
import { AppMaterialModule } from './app.material.module';
import { CrudEmpresaAddComponent } from './components/crud-empresa-add/crud-empresa-add.component';
import { CrudEmpresaUpdateComponent } from './components/crud-empresa-update/crud-empresa-update.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudEmpresaComponent,
    CrudEmpresaAddComponent,
    CrudEmpresaUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
