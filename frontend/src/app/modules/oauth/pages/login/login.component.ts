import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OauthService } from '../../services/oauth.service';
import { ToastMessage } from 'src/app/services/toastr/toast-message.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { KeyLocalStorage } from 'src/app/shared/enums/keysLocalStorage.enum';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  keyFormEmail = 'email';
  keyFormPassword = 'password';


  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _oauthService: OauthService,
    private _toastMessage: ToastMessage,
    private router: Router,


  ) {
    this.form = this.fb.group({
      [`${this.keyFormEmail}`]: ['', Validators.required],
      [`${this.keyFormPassword}`]: ['', Validators.required]

    });
  }

  ngOnInit(): void {
  }

  validateLogin() {
    if (this.form.valid) {
      this.login();
    } else {
      this.form.markAllAsTouched();
      this.toastr.error('Todos los campos son obligatorios', 'Error');
    }
  }

  login() {
    const user: UserModel = this.form.value;
    this._oauthService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem(KeyLocalStorage.token, token);
        this.router.navigate(['/task']);
      },
      error: (e: HttpErrorResponse) => {
        this._toastMessage.messageError(e);
      }
    });
  }

}
