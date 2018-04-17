import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { MainContentComponent } from './components/main-content/main-content.component';
import { InvoiceBuilderRoutingModule } from './invoice-builder-routing.module';
import { InvoiceBuilderComponent } from './invoice-builder.component';


@NgModule({
  imports: [
    CommonModule,
    InvoiceBuilderRoutingModule,
    MaterialModule
  ],
  declarations: [InvoiceBuilderComponent, MainContentComponent]
})
export class InvoiceBuilderModule { }
