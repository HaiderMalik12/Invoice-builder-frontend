import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent } from './components/client-listing/client-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './services/client.service';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [ClientListingComponent, FormDialogComponent],
  exports: [ClientListingComponent],
  providers: [ClientService],
  entryComponents: [FormDialogComponent]
})
export class ClientsModule { }
