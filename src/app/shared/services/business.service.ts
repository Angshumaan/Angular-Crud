import { Injectable, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormData } from '../../types/FormData';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    public fns: AngularFireFunctions
  ) {}

  @ViewChild('myForm') form: NgForm;

  isSubmitted: boolean = null;
  merchantInformationList: FormData[] = [];
  edit: boolean = false;
  id = null;
  fname = '';
  email = '';
  phone = '';
  website = '';
  contactName = '';
  contactPhone = '';
  contactEmail = '';
  notes = '';
  type = '';
  category = '';
  comissionPercentage = null;
  activeForm = '';
  logo = '';
  criticalAccount = null;
  cardPayment = '';
  cashOnDelivery = '';
  upi = '';
  singleMerchantData: FormData = null;

  getFormElements() {
    return this.fns.httpsCallable('getFormValues')({});
  }
  getMerchant() {
    return this.firestore.collection('/merchantData').snapshotChanges();
  }

  getSingleMerchant(merchantInformation: FormData) {
    this.singleMerchantData = merchantInformation;
    this.populateMerchant();
  }

  addMerchant(businessData: FormData) {
    this.merchantInformationList.push({
      id: businessData.id,
      fname: businessData.fname,
      email: businessData.email,
      phone: businessData.phone,
      website: businessData.website,
      contactName: businessData.contactName,
      contactPhone: businessData.contactPhone,
      contactEmail: businessData.contactEmail,
      notes: businessData.notes,
      type: businessData.type,
      category: businessData.category,
      comissionPercentage: businessData.comissionPercentage,
      activeForm: businessData.activeForm,
      logo: businessData.logo,
      criticalAccount: businessData.criticalAccount,
      paymentOptions: businessData.paymentOptions,
    });

    console.log(businessData.id);

    return this.firestore
      .collection('merchantData')
      .doc(`${businessData.id}`)
      .set(businessData, { merge: true });
  }

  updateMerchant(
    id: string,
    merchantUpdatedForm: NgForm,
    fileName: string,
    file: string
  ) {
    this.isSubmitted = true;
    const filePath = `logo/${fileName}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            const paymentOptions: string[] = [];
            if (merchantUpdatedForm.value.cashOnDelivery === true) {
              paymentOptions.push('Cash On Delivery');
            }
            if (merchantUpdatedForm.value.cardPayment === true) {
              paymentOptions.push('Card Payment');
            }
            if (merchantUpdatedForm.value.upi === true) {
              paymentOptions.push('UPI');
            }
            this.firestore
              .collection('/merchantData')
              .doc(id)
              .update({
                fname: merchantUpdatedForm.value.fname,
                email: merchantUpdatedForm.value.email,
                phone: merchantUpdatedForm.value.phone,
                website: merchantUpdatedForm.value.website,
                contactName: merchantUpdatedForm.value.contactName,
                contactPhone: merchantUpdatedForm.value.contactPhone,
                contactEmail: merchantUpdatedForm.value.contactEmail,
                notes: merchantUpdatedForm.value.notes,
                type: merchantUpdatedForm.value.type,
                category: merchantUpdatedForm.value.category,
                comissionPercentage:
                  merchantUpdatedForm.value.comissionPercentage,
                activeForm: merchantUpdatedForm.value.activeForm,
                logo: downloadURL,
                criticalAccount: merchantUpdatedForm.value.criticalAccount
                  ? 'Yes'
                  : 'No',
                paymentOptions,
              });
            merchantUpdatedForm.reset();
            this.isSubmitted = false;
          });
        })
      )
      .subscribe();
  }

  deleteMerchant(businessData: FormData) {
    return this.firestore.doc('/merchantData/' + businessData.id).delete();
  }

  populateMerchant() {
    const {
      id,
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
      logo,
      criticalAccount,
      paymentOptions,
    } = this.singleMerchantData;
    this.id = id;
    this.fname = fname;
    this.email = email;
    this.phone = phone;
    this.website = website;
    this.contactName = contactName;
    this.contactPhone = contactPhone;
    this.contactEmail = contactEmail;
    this.notes = notes;
    this.type = type;
    this.category = category;
    this.comissionPercentage = comissionPercentage;
    this.activeForm = activeForm;
    this.logo = logo;
    this.criticalAccount = criticalAccount === 'Yes' ? true : false;
    this.cardPayment = paymentOptions[1];
    this.cashOnDelivery = paymentOptions[0];
    this.upi = paymentOptions[2];
  }
}
