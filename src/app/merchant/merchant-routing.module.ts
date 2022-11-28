import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { GuardService } from '../shared/services/guard.service';
import {
  canActivate,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['signin']);

const routes: Routes = [
  {
    path: 'add-merchant',
    component: InputFormComponent,
    // data: { title: 'Add-Merchant' },
    canDeactivate: [GuardService],
    ...canActivate(redirectToLogin),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantRoutingModule {}
