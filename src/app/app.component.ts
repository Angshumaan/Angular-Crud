import { Component, Input } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { FormData } from './types/FormData';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngularForms';
  constructor(public authenticationService: AuthenticationService) {}

  onLogout() {
    this.authenticationService.signout();
  }
}
