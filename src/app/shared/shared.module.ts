import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [ConfirmationComponent, ProgressSpinnerComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [ConfirmationComponent, ProgressSpinnerComponent],
})
export class SharedModule {}
