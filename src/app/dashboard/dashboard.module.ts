import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InvoicesModule } from '../invoices/invoices.module';
import { ClientsModule } from '../clients/clients.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InvoicesModule,
    ClientsModule,
    MaterialModule
  ],
  declarations: [DashboardComponent, SideNavComponent, ToolbarComponent]
})
export class DashboardModule {}
