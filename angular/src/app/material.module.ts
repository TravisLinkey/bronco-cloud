import { NgModule } from '@angular/core';

import { 
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatTabsModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
 } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
})
export class MaterialModule { }