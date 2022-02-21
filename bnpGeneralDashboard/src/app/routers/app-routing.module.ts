import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGraphicComponent } from '../components/home/General Dashboard/dashboard-graphic/dashboard-graphic.component';
import { DashboardSummaryComponent } from '../components/home/General Dashboard/dashboard-summary/dashboard-summary.component';
import { HomeComponent } from '../components/home/home.component';
import { OmniturnoGraphComponent } from '../components/home/Omniturno/omniturno-graph/omniturno-graph.component';
import { OmniturnoSumaryComponent } from '../components/home/Omniturno/omniturno-sumary/omniturno-sumary.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'general', component: DashboardSummaryComponent },
      { path: 'general-chart', component: DashboardGraphicComponent },
      {
        path: 'omniturno',
        component: OmniturnoSumaryComponent,
      },
      {
        path: 'omni-chart',
        component: OmniturnoGraphComponent,
      },
    ],
  },
  {
    path: 'index.aspx',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
