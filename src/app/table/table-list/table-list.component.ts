import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../shared/services/business.service';
import { FormData } from '../../types/FormData';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  merchantInformationList: FormData[] = [];

  constructor(
    public businessService: BusinessService,
    public router: Router,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private route: ActivatedRoute
  ) {}

  // user$ = this.authenticationService.currentUser$;
  id: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => console.log('tabel', res));
    this.getAllMerchant();
  }

  getAllMerchant() {
    this.businessService.getMerchant().subscribe(
      (res) => {
        this.merchantInformationList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert('Error while fetching the data');
      },
      () => {
        alert('Completed');
      }
    );
  }
  deleteMerchantInfo(
    singleMerchantInfo: FormData,
    enterAnimation: string,
    exitAnimation: string
  ) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '10rem',
      width: '20rem',
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: exitAnimation,
      data: { name: singleMerchantInfo.fname },
      role: 'alertdialog',
      autoFocus: 'first-tabbable',
      restoreFocus: false,
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.businessService.deleteMerchant(singleMerchantInfo);
        this._snackbar.openFromComponent(SnackBarComponent, {
          duration: 4 * 1000,
        });
      }
    });
  }

  editData(id: number) {
    this.businessService.edit = true;
    this.merchantInformationList.map((data) => {
      if (id == data.id) {
        this.businessService.getSingleMerchant(data);
      }
    });
  }
}

// canActivate(
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): boolean | Observable<boolean> | Promise<boolean> {
//   if (this.authenticationService.isSignedIn()) {
//     return true;
//   }
//   return false;
// }
// displayedColumns: string[] = [
//   'fname',
//   'email',
//   'phone',
//   'website',
//   'notes',
//   'type',
//   'category',
//   'logo',
//   'criticalAccount',
// ];
// dataSource = this.merchantInformationList;
