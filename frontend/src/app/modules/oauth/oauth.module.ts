import { NgModule } from "@angular/core";
import { LoginComponent } from './pages/login/login.component';
import { OauthRoutingModule } from "./oauth-routing.module";
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { Material } from "src/app/shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
@NgModule({
  declarations: [
    LoginComponent,
    SingInComponent
  ],
  imports: [
    OauthRoutingModule,
    Material,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      preventDuplicates: true,
    }),
  ]
})
export class OauthModule { }
