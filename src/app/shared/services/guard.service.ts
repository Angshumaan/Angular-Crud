import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CanDeactivate, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { InputFormComponent } from '../../merchant/input-form/input-form.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanDeactivate<InputFormComponent> {
  confirmDlg: MatDialogRef<ConfirmationComponent>;

  constructor(private dialog: MatDialog, private router: Router) {}
  canDeactivate(component: InputFormComponent) {
    const subject = new Subject<boolean>();

    if (component.form.dirty) {
      this.confirmDlg = this.dialog.open(ConfirmationComponent, {
        disableClose: true,
      });
      // this.confirmDlg.componentInstance.subject = subject;

      // console.log(this.confirmDlg.componentInstance.subject);

      return this.confirmDlg.afterClosed();

      // if (response) {
      //     // console.log(response);
      //     this.router.navigate(['merchant-list']);
      //   } else {
      //     // when response is NO
      //     console.log('You decided to stay on Page!');
      //   // }
      // });

      // return subject.asObservable();
    }
    return of(true);
  }
}
