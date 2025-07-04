import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class ToastMessage {


  constructor(
    private toastr: ToastrService
  ) {}


  messageError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error');
    } else {
      this.toastr.error('Ocurrio un error, comuniquese con el administrador', 'Error');
    }
  }
}
