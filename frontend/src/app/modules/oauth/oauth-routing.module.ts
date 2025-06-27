import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { SingInComponent } from "./pages/sing-in/sing-in.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signIn',
    component: SingInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OauthRoutingModule {}
