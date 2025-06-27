import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastMessage } from 'src/app/services/toastr/toast-message.service';

@Component({
  selector: 'app-task-new-edit',
  templateUrl: './task-new-edit.component.html',
  styleUrls: ['./task-new-edit.component.css']
})
export class TaskNewEditComponent implements OnInit {

  form: FormGroup;
  keyFormTitle = 'title';
  keyFormDescription = 'description';
  keyFormStatus = 'status';

  dataTask?: TaskModel;

  idTask?: number;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _taskService: TaskService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _toastMessage: ToastMessage
  ) {
    this.form = this.fb.group({
      [`${this.keyFormTitle}`]: ['', Validators.required],
      [`${this.keyFormDescription}`]: ['', Validators.required],
      [`${this.keyFormStatus}`]: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.checkIfEditMode();
  }

  checkIfEditMode() {
    this.idTask = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idTask) {
      this.isEdit = true;
      this.getTask(this.idTask);
    }
  }

  getTask(id: number) {
    this._taskService.getTask(id.toString()).subscribe({
      next: (res) => {
        this.form.patchValue(res);
      },
      error: (e: HttpErrorResponse) => {
        this._toastMessage.messageError(e);
      }
    });
  }

  validateForm() {
    if (this.form.valid) {
      const task: TaskModel = this.form.value;
      // {
      //   title: this.form.get(this.keyFormTitle)?.value,
      //   description: this.form.get(this.keyFormDescription)?.value,
      //   status: this.form.get(this.keyFormStatus)?.value
      // };

      if (this.idTask) {
        this.updateTask(task);
      } else {
        this.createTask(task);
      }
    } else {
      this.form.markAllAsTouched();
      this.toastr.error('Todos los campos son obligatorios', 'Error');
    }
  }
  createTask(task: TaskModel) {
    this._taskService.createTask(task).subscribe({
      next: () => {
        this.toastr.success(`La tarea ${task.title} fue registrada con exito`, 'Tarea registrada');
        this.router.navigate(['/task']);
      },
      error: (e: HttpErrorResponse) => {
        this._toastMessage.messageError(e);
      }
    });
  }

  updateTask(task: TaskModel) {
    this._taskService.updateTask(task, this.idTask!.toString()).subscribe({
      next: () => {
        this.toastr.success(`La tarea ${task.title} fue actualizada con exito`, 'Tarea actualizada');
        this.router.navigate(['/task']);
      },
      error: (e: HttpErrorResponse) => {
        this._toastMessage.messageError(e);
      }
    });
  }

}
