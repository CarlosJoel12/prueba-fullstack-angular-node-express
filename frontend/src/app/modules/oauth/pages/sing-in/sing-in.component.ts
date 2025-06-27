import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OauthService } from '../../services/oauth.service';
import { error } from 'console';
import { ToastMessage } from 'src/app/services/toastr/toast-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  form: FormGroup;
  keyFormName = 'name';
  keyFormEmail = 'email';
  keyFormPassword = 'password';
  keyFormConfirmPassword = 'confirmPassword';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _oauthService: OauthService,
    private _toastMessage: ToastMessage
  ) {
    this.form = this.fb.group({
      [`${this.keyFormName}`]: ['', Validators.required],
      [`${this.keyFormEmail}`]: ['', [Validators.required, Validators.email]],
      [`${this.keyFormPassword}`]: ['', Validators.required],
      [`${this.keyFormConfirmPassword}`]: ['', Validators.required]

    });

  }

  ngOnInit(): void {
  }

  registerUser() {
    if (this.form.valid) {
      const password = this.form.get(this.keyFormPassword)?.value;
      const confirmPassword = this.form.get(this.keyFormConfirmPassword)?.value;

      if (password == confirmPassword) {
        this.addUder();
      } else {
        this.form.get(this.keyFormConfirmPassword)?.markAsTouched();
        this.form.get(this.keyFormConfirmPassword)?.markAsDirty();
        this.toastr.error('Las contaseñas ingresadas son distintas', 'Error');
      }
    } else {
      this.form.markAllAsTouched();
      this.toastr.error('Todos los campos son obligatorios', 'Error');
    }
  }

  addUder() {
    const user: UserModel = {
      name: this.form.get(this.keyFormName)?.value,
      email: this.form.get(this.keyFormEmail)?.value,
      password: this.form.get(this.keyFormPassword)?.value
    }

    this._oauthService.signIn(user).subscribe({
      next: () => {
        this.toastr.success(`El usuario ${user.name} fue registrado con exito`, 'Usuario registrado');
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this._toastMessage.messageError(e);
      }
    })
  }

}
