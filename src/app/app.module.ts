import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { MerchantModule } from './merchant/merchant.module';
import { TableModule } from './table/table.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthenticationService } from './shared/services/authentication.service';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { HotToastModule } from '@ngneat/hot-toast';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MerchantModule,
    TableModule,
    NgDynamicBreadcrumbModule,
    AngularFireFunctionsModule,
    HotToastModule.forRoot(),
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
