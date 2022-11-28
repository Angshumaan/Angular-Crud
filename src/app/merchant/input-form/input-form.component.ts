import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessService } from '../../shared/services/business.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormData } from '../../types/FormData';
import { ViewEncapsulation } from '@angular/core';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Observable } from 'rxjs';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-input-form',
  templateUrl: '/input-form.component.html',
  styleUrls: ['./input-form.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: { overlayPanelClass: 'customClass' },
    },
  ],
})
export class InputFormComponent implements OnInit {
  @ViewChild('myForm') form: NgForm;

  businessData: FormData = {
    id: '',
    fname: '',
    email: '',
    phone: '',
    website: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    notes: '',
    type: '',
    category: '',
    comissionPercentage: 0,
    activeForm: '',
    logo: null,
    criticalAccount: '',
    paymentOptions: [],
  };

  imgSrc: string = '';
  selectedImage: any = '';
  url: string = '';
  selectedFile: any = null;
  categories: any[] = [];
  businessType = [];
  payment = [];
  filteredDataToSearch: any[] = [];
  defaultType = 'Small Business';
  formItems!: Observable<any>;
  constructor(
    public businessService: BusinessService,
    private router: Router,
    private storage: AngularFireStorage,
    public authenticationService: AuthenticationService,
    public angularFireStore: AngularFirestore,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private route: ActivatedRoute
  ) {
    this.formItems = this.businessService.getFormElements().pipe(
      map((actions) =>
        actions.map((a: { Data: any }) => {
          const data = a.Data;
          return data;
        })
      )
    );
  }

  user$ = this.authenticationService.currentUser$;

  id: string;
  ngOnInit(): void {
    this.getCategoriesData();
    this.getTypeData();
    this.getPaymentData();
    const breadcrumb = {
      customText: 'This is Custom Text',
      dynamicText: 'Level 2 ',
    };
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log('params', this.id);
    });

    this.ngDynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
  }

  updateBreadcrumb(): void {
    const breadcrumbs = [
      {
        label: `merchant-list`,
        url: '/merchant-list/',
      },
      {
        label: `merchant-list ${this.id}`,
        url: '/merchant-list/:id',
      },
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }

  convertArrayofObjects(objectData: {}, array: { id: number; value: any }[]) {
    const data = objectData;
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      array.push({
        id: i,
        value: data[keys[i]],
      });
    }
  }
  getCategoriesData() {
    this.formItems.subscribe((res) => {
      this.convertArrayofObjects(res[0], this.categories);
      this.filteredDataToSearch = this.categories.map((w) => {
        console.log(w);
        return {
          text: w.value,
          value: w.id,
        };
      });
    });
  }

  getTypeData() {
    this.formItems.subscribe((res) => {
      this.convertArrayofObjects(res[3], this.businessType);
    });
  }

  getPaymentData() {
    this.formItems.subscribe((res) => {
      this.convertArrayofObjects(res[1], this.payment);
    });
  }

  lookup(e: any) {
    this.filteredDataToSearch = this.categories
      .filter((i) => i.value.toString().toLowerCase().indexOf(e) > -1)
      .map((w) => {
        return {
          text: w.value,
          value: w.id,
        };
      });
  }

  isEdit() {
    return this.businessService.edit;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0].name ?? null;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const data = event.target.result;
        this.url = data;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }

  file = `${this.selectedImage
    .split('.')
    .slice(0, -1)
    .join('.')}_${new Date().getTime()}`;

  onSubmit() {
    if (this.form.valid) {
      const {
        fname,
        email,
        phone,
        website,
        contactName,
        contactPhone,
        contactEmail,
        notes,
        type,
        category,
        comissionPercentage,
        activeForm,
        criticalAccount,
      } = this.form.value;

      this.businessService.isSubmitted = true;
      const filePath = `logo/${this.selectedImage.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedImage);
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((downloadURL) => {
              if (this.form.value.cashOnDelivery === true) {
                this.businessData.paymentOptions.push('Cash on Delivery');
              }
              if (this.form.value.cardPayment === true) {
                this.businessData.paymentOptions.push('Card Payment');
              }
              if (this.form.value.upi === true) {
                this.businessData.paymentOptions.push('UPI');
              }

              this.businessData.id = Date.now() + Math.random();
              this.businessData.fname = fname;
              this.businessData.email = email;
              this.businessData.phone = phone;
              this.businessData.website = website;
              this.businessData.contactName = contactName;
              this.businessData.contactPhone = contactPhone;
              this.businessData.contactEmail = contactEmail;
              this.businessData.notes = notes;
              this.businessData.type = type;
              this.businessData.category = category;
              this.businessData.comissionPercentage = comissionPercentage;
              this.businessData.activeForm = activeForm;
              this.businessData.logo = downloadURL;
              this.businessData.criticalAccount = criticalAccount
                ? 'Yes'
                : 'No';
              this.businessData.paymentOptions;
              this.businessService.addMerchant(this.businessData);
              this.form.resetForm();
              this.imgSrc = '';
              this.selectedImage = null;
              this.businessService.isSubmitted = false;
            });
          })
        )
        .subscribe();
    }
  }

  updateMerchant(id: string) {
    let ngForm: NgForm = this.form;

    this.businessService.updateMerchant(
      id,
      ngForm,
      this.selectedImage.name,
      this.selectedImage
    );
    this.businessService.edit = !this.businessService.edit;
  }

  toggleReset() {
    this.businessService.edit = !this.businessService.edit;
    this.form.reset();
    this.router.navigate(['add-merchant']);
  }
}
