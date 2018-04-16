import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceBuilderRoutingModule } from './invoice-builder-routing.module';
import { InvoiceBuilderComponent } from './invoice-builder.component';

@NgModule({
  imports: [
    CommonModule,
    InvoiceBuilderRoutingModule
  ],
  declarations: [InvoiceBuilderComponent]
})
export class InvoiceBuilderModule { }
