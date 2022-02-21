//-----------------------------------------------------------------------------
// Angular Native Components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routers/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//-----------------------------------------------------------------------------
// Customs Modules and Components
import { MaterialModule } from './modules/material.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { DataTablesModule } from 'angular-datatables';

//-----------------------------------------------------------------------------
// Custom Interceptors
import { TokenInterceptor } from './services/token/token.interceptor';
import { HomeComponent } from './components/home/home.component';
import { NotificationComponent } from './components/dialogs/notification/notification.component';
import { ConfirmationComponent } from './components/dialogs/confirmation/confirmation.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardSummaryComponent } from './components/home/General Dashboard/dashboard-summary/dashboard-summary.component';
import { DashboardGraphicComponent } from './components/home/General Dashboard/dashboard-graphic/dashboard-graphic.component';
import { OmniturnoSumaryComponent } from './components/home/Omniturno/omniturno-sumary/omniturno-sumary.component';
import { OmniturnoGraphComponent } from './components/home/Omniturno/omniturno-graph/omniturno-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotificationComponent,
    ConfirmationComponent,
    SignInComponent,
    DashboardSummaryComponent,
    DashboardGraphicComponent,
    OmniturnoSumaryComponent,
    OmniturnoGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    DataTablesModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
