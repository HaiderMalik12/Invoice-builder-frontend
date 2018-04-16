import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceBuilderRoutingModule } from './invoice-builder-routing.module';
import { InvoiceBuilderComponent } from './invoice-builder.component';
import { MainContentComponent } from './components/main-content/main-content.component';

@NgModule({
  imports: [
    CommonModule,
    InvoiceBuilderRoutingModule
  ],
  declarations: [InvoiceBuilderComponent, MainContentComponent]
})
export class InvoiceBuilderModule { }
