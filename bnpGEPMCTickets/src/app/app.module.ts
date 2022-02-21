// ----------------------------------------------------------------------------- //
// --------------------- Base components  area --------------------------------- //
// ----------------------------------------------------------------------------- //

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/material.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NotificationComponent } from './components/events/notification/notification.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './services/token.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ConfirmationComponent } from './components/events/confirmation/confirmation.component';
import { InboxComponent } from './components/home/inbox/inbox.component';
import { EditTicketComponent } from './components/home/inbox/edit-ticket/edit-ticket.component';
import { AssignmentComponent } from './components/home/inbox/assignment/assignment.component';
import { MyTicketsComponent } from './components/home/my-tickets/my-tickets.component';
import { WorkloadComponent } from './components/home/workload/workload.component';
import { TeamComponent } from './components/home/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    NotificationComponent,
    ConfirmationComponent,
    InboxComponent,
    EditTicketComponent,
    AssignmentComponent,
    MyTicketsComponent,
    WorkloadComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    LayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    DataTablesModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
