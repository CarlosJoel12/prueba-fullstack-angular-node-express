import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { getFullEndpoint } from "src/app/endpoints/endpoints";
import { EndpointsPaths } from '../../../endpoints/endpoints';
import { UserModel } from "../models/user";

@Injectable({
  providedIn: 'root'
})

export class OauthService {

  constructor(
    private http: HttpClient
  ) { }

  signIn(user: UserModel): Observable<void> {
    return this.http.post<void>(getFullEndpoint(EndpointsPaths.authRegister), user);
  }

  login(user: UserModel): Observable<string> {
    return this.http.post<string>(getFullEndpoint(EndpointsPaths.authLogin), user);
  }

}
