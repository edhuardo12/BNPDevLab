import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { LoginComponent } from './components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './services/auth.service';
import { DataTablesModule } from 'angular-datatables';
import { GestionoficialComponent } from './components/home/gestionoficial/gestionoficial.component';
import { SubregistrosComponent } from './components/Events/subregistros/subregistros.component';
import { CreatecustomerComponent } from './components/Events/createcustomer/createcustomer.component';
import { ConfirmationDialogComponent } from './components/Events/confirmation-dialog/confirmation-dialog.component';
import { ClasificationViewComponent } from './components/home/Views/clasification-view/clasification-view.component';
import { GeneralViewComponent } from './components/home/Views/general-view/general-view.component';
import { NewRegisterComponent } from './components/Events/new-register/new-register.component';
import { AdminComponent } from './components/admin/admin.component';
import { GestionAnalistaComponent } from './components/admin/gestion-analista/gestion-analista.component';
import { AdminSubRegistComponent } from './components/admin/events/admin-sub-regist/admin-sub-regist.component';
import { AdmClasificationViewComponent } from './components/admin/views/adm-clasification-view/adm-clasification-view.component';
import { AdmGeneralViewComponent } from './components/admin/views/adm-general-view/adm-general-view.component';
import { IndustrialViewComponent } from './components/home/Views/industrial-view/industrial-view.component';
import { AdmIndustrialViewComponent } from './components/admin/views/adm-industrial-view/adm-industrial-view.component';
import { PageManagementComponent } from './components/Management/page-management/page-management.component';
import { AgroViewComponent } from './components/home/Views/agro-view/agro-view.component';
import { AdmAgroViewComponent } from './components/admin/views/adm-agro-view/adm-agro-view.component';
import { GanaderoViewComponent } from './components/home/Views/ganadero-view/ganadero-view.component';
import { ForestalViewComponent } from './components/home/Views/forestal-view/forestal-view.component';
import { ConstruccionViewComponent } from './components/home/Views/construccion-view/construccion-view.component';
import { AdmGanaderoViewComponent } from './components/admin/views/adm-ganadero-view/adm-ganadero-view.component';
import { HistoricoAnalistaComponent } from './components/admin/historico-analista/historico-analista.component';
import { SeguimientoViewComponent } from './components/home/Views/seguimiento-view/seguimiento-view.component';
import { AdmForestalViewComponent } from './components/admin/views/adm-forestal-view/adm-forestal-view.component';
import { AdmConstruccionViewComponent } from './components/admin/views/adm-construccion-view/adm-construccion-view.component';
import { AdmSegumientoViewComponent } from './components/admin/views/adm-segumiento-view/adm-segumiento-view.component';
import { PrintAgricolaComponent } from './components/print-view/print-agricola/print-agricola.component';
import { PrintClasificacionComponent } from './components/print-view/print-clasificacion/print-clasificacion.component';
import { PrintConstruccionComponent } from './components/print-view/print-construccion/print-construccion.component';
import { PrintForestalComponent } from './components/print-view/print-forestal/print-forestal.component';
import { PrintGanaderiaComponent } from './components/print-view/print-ganaderia/print-ganaderia.component';
import { PrintGeneralComponent } from './components/print-view/print-general/print-general.component';
import { PrintIndustrialComponent } from './components/print-view/print-industrial/print-industrial.component';
import { PrintSeguimientoComponent } from './components/print-view/print-seguimiento/print-seguimiento.component';
import { CommentDialogComponent } from './components/Events/comment-dialog/comment-dialog.component';
import { ReporteClasificacionComponent } from './components/admin/reporte-clasificacion/reporte-clasificacion.component';
import { ClientManagementComponent } from './components/Events/client-management/client-management.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GestionoficialComponent,
    SubregistrosComponent,
    CreatecustomerComponent,
    ConfirmationDialogComponent,
    ClasificationViewComponent,
    GeneralViewComponent,
    NewRegisterComponent,
    AdminComponent,
    GestionAnalistaComponent,
    AdminSubRegistComponent,
    AdmClasificationViewComponent,
    AdmGeneralViewComponent,
    IndustrialViewComponent,
    AdmIndustrialViewComponent,
    PageManagementComponent,
    AgroViewComponent,
    AdmAgroViewComponent,
    GanaderoViewComponent,
    ForestalViewComponent,
    ConstruccionViewComponent,
    AdmGanaderoViewComponent,
    HistoricoAnalistaComponent,
    SeguimientoViewComponent,
    AdmForestalViewComponent,
    AdmConstruccionViewComponent,
    AdmSegumientoViewComponent,
    PrintClasificacionComponent,
    PrintGeneralComponent,
    PrintSeguimientoComponent,
    PrintIndustrialComponent,
    PrintAgricolaComponent,
    PrintGanaderiaComponent,
    PrintForestalComponent,
    PrintConstruccionComponent,
    CommentDialogComponent,
    ReporteClasificacionComponent,
    ClientManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    DataTablesModule,
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
