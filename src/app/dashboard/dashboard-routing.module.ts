import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { DashboardComponent } from './dashboard.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {path : '',
      component: MainContentComponent},
      {
        path: 'invoices',
        component: InvoiceListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
