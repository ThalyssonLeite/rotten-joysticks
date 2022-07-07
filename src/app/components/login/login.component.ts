import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setHeaderMenuLabel } from 'src/app/data/app.actions';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inputs = {
    email: '',
    password: ''
  }

  error: boolean = false;
  loading: boolean = false;

  constructor(private apiService: APIService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(setHeaderMenuLabel({ label: 'Home' }));
  }

  storeInputOf ($event, inputType) {
    $event.stopPropagation();

    this.inputs[inputType] = $event.target.value;
    this.error = false;
  }

  tryToLogin () {
    this.loading = true;
    this.apiService.auth(this.inputs.email, this.inputs.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.loading = false;
        this.router.navigate(['']);
        this.store.dispatch(setHeaderMenuLabel({ label: 'Signout' }));
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
