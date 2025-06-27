import { NgModule } from "@angular/core";
import { TaskListComponent } from "./pages/task-list/task-list.component";
import { TaskRoutingModule } from "./task-routing.module";
import { TaskNewEditComponent } from './pages/task-new-edit/task-new-edit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Material } from "src/app/shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [TaskListComponent, TaskNewEditComponent, NavbarComponent],
  imports: [
    TaskRoutingModule,
    Material,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class TaskModule { }
