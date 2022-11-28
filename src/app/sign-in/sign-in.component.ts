import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { from } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  onSubmit() {
    if (!this.signinForm.valid) {
      return;
    }

    const { email, password } = this.signinForm.value;
    from(this.authenticationService.signIn(email, password))
      .pipe(
        this.toast.observe({
          success: 'Logged In Successfully',
          loading: 'loading',
          error: 'There was an erorr!!! Your email is not registered with us ',
        })
      )
      .subscribe();
  }
}
