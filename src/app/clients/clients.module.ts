import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListingComponent, DialogOverviewExampleDialog } from './components/client-listing/client-listing.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './services/client.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [ClientListingComponent, DialogOverviewExampleDialog],
  exports: [ClientListingComponent],
  providers: [ClientService],
  entryComponents: [DialogOverviewExampleDialog]
})
export class ClientsModule { }
