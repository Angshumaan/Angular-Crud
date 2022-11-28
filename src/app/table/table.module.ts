import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list/table-list.component';
import { ThanksPipe } from '../pipes/thanks.pipe';
import { HighlightDirective } from './highlight.directive';
import { TableRoutingModule } from './table-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TableListComponent,
    ThanksPipe,
    HighlightDirective,
    DeleteDialogComponent,
    SnackBarComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule,
  ],
  exports: [TableListComponent],
})
export class TableModule {}
