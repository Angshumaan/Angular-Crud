import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import { InputFormComponent } from '../merchant/input-form/input-form.component';
import { GuardService } from '../shared/services/guard.service';
import {
  canActivate,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['signin']);

const routes: Routes = [
  {
    path: 'merchant-list',
    component: TableListComponent,
    data: {
      title: 'merchant-list',
      breadcrumb: [
        {
          label: 'merchant-list',
          url: '',
        },
      ],
    },
    ...canActivate(redirectToLogin),
  },
  {
    path: 'merchant-list/:id/edit',
    canDeactivate: [GuardService],
    component: InputFormComponent,
    pathMatch: 'full',
    data: {
      title: 'merchant-list',
      breadcrumb: [
        {
          label: 'merchant-list',
          url: '',
        },
      ],
    },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
