import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatIconModule, MatSidenavModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  exports : [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  declarations: []
})
export class MaterialModule { }
