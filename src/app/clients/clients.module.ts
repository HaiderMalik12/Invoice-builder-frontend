import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './components/client-listing/client-listing.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './services/client.service';
import { ClientFormDialog } from './components/client-dialog-form';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [ClientListingComponent, ClientFormDialog],
  exports: [ClientListingComponent],
  providers: [ClientService],
  entryComponents: [ClientFormDialog]
})
export class ClientsModule { }
