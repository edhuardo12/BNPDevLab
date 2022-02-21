import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { InboxComponent } from '../components/home/inbox/inbox.component';
import { MyTicketsComponent } from '../components/home/my-tickets/my-tickets.component';
import { TeamComponent } from '../components/home/team/team.component';
import { WorkloadComponent } from '../components/home/workload/workload.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { role: ['owner', 'administrador', 'supervisor', 'analista'] },
    canActivate: [AuthGuard, RoleGuard],
    children: [
      { path: 'inbox', component: InboxComponent },
      {
        path: 'myTeam',
        component: TeamComponent,
      },
      { path: 'myTickets', component: MyTicketsComponent },
      { path: 'workload', component: WorkloadComponent },
    ],
  },
  { path: 'sign-in', component: SignInComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: '**', // wildcard route for a 404 page
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
