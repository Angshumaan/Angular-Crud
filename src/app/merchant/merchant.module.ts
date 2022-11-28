import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from './input-form/input-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MerchantRoutingModule } from './merchant-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { EmailValidatorDirective } from './email-validator.directive';
import { SanitizerPipe } from '../pipes/sanitizer.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [InputFormComponent, EmailValidatorDirective, SanitizerPipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MerchantRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [InputFormComponent, EmailValidatorDirective, SanitizerPipe],
  providers: [],
})
export class MerchantModule {}
