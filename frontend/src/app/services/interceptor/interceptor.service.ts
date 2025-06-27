import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { ToastMessage } from "../toastr/toast-message.service";
import { KeyLocalStorage } from "src/app/shared/enums/keysLocalStorage.enum";


@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private _toastMessage: ToastMessage
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(KeyLocalStorage.token);
    if(token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    }

    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        if(e.status === 401) {
          this._toastMessage.messageError(e)
          this.router.navigate(['/login']);
        }
        return throwError(() => e)
      })
    )
  }

}
