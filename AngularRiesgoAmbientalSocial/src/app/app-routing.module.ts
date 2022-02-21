import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { GestionAnalistaComponent } from './components/admin/gestion-analista/gestion-analista.component';
import { HistoricoAnalistaComponent } from './components/admin/historico-analista/historico-analista.component';
import { ReporteClasificacionComponent } from './components/admin/reporte-clasificacion/reporte-clasificacion.component';
import { AdmAgroViewComponent } from './components/admin/views/adm-agro-view/adm-agro-view.component';
import { AdmClasificationViewComponent } from './components/admin/views/adm-clasification-view/adm-clasification-view.component';
import { AdmConstruccionViewComponent } from './components/admin/views/adm-construccion-view/adm-construccion-view.component';
import { AdmForestalViewComponent } from './components/admin/views/adm-forestal-view/adm-forestal-view.component';
import { AdmGanaderoViewComponent } from './components/admin/views/adm-ganadero-view/adm-ganadero-view.component';
import { AdmGeneralViewComponent } from './components/admin/views/adm-general-view/adm-general-view.component';
import { AdmIndustrialViewComponent } from './components/admin/views/adm-industrial-view/adm-industrial-view.component';
import { AdmSegumientoViewComponent } from './components/admin/views/adm-segumiento-view/adm-segumiento-view.component';
import { GestionoficialComponent } from './components/home/gestionoficial/gestionoficial.component';
import { HomeComponent } from './components/home/home.component';
import { AgroViewComponent } from './components/home/Views/agro-view/agro-view.component';
import { ClasificationViewComponent } from './components/home/Views/clasification-view/clasification-view.component';
import { ConstruccionViewComponent } from './components/home/Views/construccion-view/construccion-view.component';
import { ForestalViewComponent } from './components/home/Views/forestal-view/forestal-view.component';
import { GanaderoViewComponent } from './components/home/Views/ganadero-view/ganadero-view.component';
import { GeneralViewComponent } from './components/home/Views/general-view/general-view.component';
import { IndustrialViewComponent } from './components/home/Views/industrial-view/industrial-view.component';
import { SeguimientoViewComponent } from './components/home/Views/seguimiento-view/seguimiento-view.component';
import { LoginComponent } from './components/login/login.component';
import { PageManagementComponent } from './components/Management/page-management/page-management.component';
import { PrintAgricolaComponent } from './components/print-view/print-agricola/print-agricola.component';
import { PrintClasificacionComponent } from './components/print-view/print-clasificacion/print-clasificacion.component';
import { PrintConstruccionComponent } from './components/print-view/print-construccion/print-construccion.component';
import { PrintForestalComponent } from './components/print-view/print-forestal/print-forestal.component';
import { PrintGanaderiaComponent } from './components/print-view/print-ganaderia/print-ganaderia.component';
import { PrintGeneralComponent } from './components/print-view/print-general/print-general.component';
import { PrintIndustrialComponent } from './components/print-view/print-industrial/print-industrial.component';
import { PrintSeguimientoComponent } from './components/print-view/print-seguimiento/print-seguimiento.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: 'ListOfficer', component: GestionoficialComponent },
      { path: 'clasificacion-view', component: ClasificationViewComponent },
      { path: 'general-view', component: GeneralViewComponent },
      { path: 'IND-view', component: IndustrialViewComponent },
      { path: 'AGR-view', component: AgroViewComponent },
      { path: 'GAN-view', component: GanaderoViewComponent },
      { path: 'FOR-view', component: ForestalViewComponent },
      { path: 'CON-view', component: ConstruccionViewComponent },
      { path: 'SEG-view', component: SeguimientoViewComponent },
    ],
  },
  {
    path: 'administration',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      { path: 'listAdmin', component: GestionAnalistaComponent },
      {
        path: 'adm-clasification-view',
        component: AdmClasificationViewComponent,
      },
      {
        path: 'adm-general-view',
        component: AdmGeneralViewComponent,
      },
      { path: 'adm-IND-view', component: AdmIndustrialViewComponent },
      { path: 'adm-AGR-view', component: AdmAgroViewComponent },
      { path: 'adm-GAN-view', component: AdmGanaderoViewComponent },
      { path: 'adm-FOR-view', component: AdmForestalViewComponent },
      { path: 'adm-CON-view', component: AdmConstruccionViewComponent },
      { path: 'adm-SEG-view', component: AdmSegumientoViewComponent },

      { path: 'historico', component: HistoricoAnalistaComponent },
      { path: 'rep-clasificacion', component: ReporteClasificacionComponent },
    ],
  },
  {
    path: 'print',
    children: [
      { path: 'clasificacion', component: PrintClasificacionComponent },
      { path: 'general', component: PrintGeneralComponent },
      { path: 'seguimiento', component: PrintSeguimientoComponent },
      { path: 'IND-print', component: PrintIndustrialComponent },
      { path: 'AGR-print', component: PrintAgricolaComponent },
      { path: 'GAN-print', component: PrintGanaderiaComponent },
      { path: 'FOR-print', component: PrintForestalComponent },
      { path: 'CON-print', component: PrintConstruccionComponent },
    ],
  },
  { path: 'login', component: LoginComponent },

  { path: 'index.aspx', pathMatch: 'full', redirectTo: 'login' }, // default route
  { path: '', pathMatch: 'full', redirectTo: 'login' }, // default route
  { path: '**', component: PageManagementComponent }, // wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
