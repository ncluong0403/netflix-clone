declare const google: any;
import { jwtDecode } from 'jwt-decode';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formLogin = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: [''],
  });
  private router = inject(Router);
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    const infoUserLoggedExisted = JSON.parse(
      sessionStorage.getItem('infoUserLogged') as string
    );
    if (!infoUserLoggedExisted && google) {
      google.accounts.id.initialize({
        client_id:
          '167079169649-kn5aaqrj6bqol413hmqvr63njbacf9cp.apps.googleusercontent.com',
        callback: (res: any) => this.signInWithGoogle(res),
      });
      google.accounts.id.renderButton(document.getElementById('google-btn'), {
        size: 'large',
        theme: 'filled_blue',
        width: 355,
      });
    } else {
      this.router.navigate(['']);
    }
  }
  login() {
    console.log(this.formLogin);
  }
  signInWithGoogle(res: any) {
    if (res) {
      const payload = jwtDecode(res.credential) as string;
      sessionStorage.setItem('infoUserLogged', JSON.stringify(payload));
      this.router.navigate(['']);
    }
  }
}
