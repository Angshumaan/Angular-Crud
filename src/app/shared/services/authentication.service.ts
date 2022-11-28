import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public angularFireAuth: AngularFireAuth,
    private router: Router
  ) {}

  currentUser$ = this.angularFireAuth.authState;

  signUp(name: string, email: string, password: string) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((authenticate) => {
        // window.alert('You have been successfully registered!');
        console.log(authenticate.user);
        authenticate.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            this.router.navigate(['add-merchant']);
          });
      });
    // .catch((error) => {
    //   window.alert(error.message);
    // });
  }
  // Sign in with email/password
  loggedIn: boolean = false;
  isSignedIn(): boolean {
    return this.loggedIn;
  }

  signIn(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['add-merchant']);
        this.loggedIn = true;
        console.log(result);
      });
    // .catch((error) => {
    //   this.loggedIn = false;
    //   window.alert(error.message);
    // });
  }

  signout() {
    return this.angularFireAuth
      .signOut()
      .then((result) => {
        this.router.navigate(['/']);
        console.log(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
