import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskListComponent } from "./pages/task-list/task-list.component";
import { TaskNewEditComponent } from "./pages/task-new-edit/task-new-edit.component";

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: 'new',
    component: TaskNewEditComponent
  },
  {
    path: 'edit/:id',
    component: TaskNewEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule { }
