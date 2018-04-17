import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { MainContentComponent } from './components/main-content/main-content.component';
import { InvoiceBuilderRoutingModule } from './invoice-builder-routing.module';
import { InvoiceBuilderComponent } from './invoice-builder.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  imports: [
    CommonModule,
    InvoiceBuilderRoutingModule,
    MaterialModule
  ],
  declarations: [InvoiceBuilderComponent, MainContentComponent, SideNavComponent, ToolbarComponent]
})
export class InvoiceBuilderModule { }
