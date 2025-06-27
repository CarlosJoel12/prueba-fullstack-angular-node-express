import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastMessage } from 'src/app/services/toastr/toast-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  listTask: TaskModel[] = [];
  dataSource = new MatTableDataSource<TaskModel>();
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'actions'
  ];

  constructor(
    private _taskService: TaskService,
    private toastr: ToastrService,
    private _toastMessage: ToastMessage,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getListTask();
  }

  getListTask() {
    this._taskService.getListTask().subscribe({
      next: (res) => {
        this.listTask = res;
        this.dataSource = new MatTableDataSource(this.listTask);
      },
      error: (e: HttpErrorResponse) => {
        this._toastMessage.messageError(e);
      }
    });
  }

  deleteTask(id: number) {
    this._taskService.deleteTask(id.toString()).subscribe({
      next: () => {
        this.getListTask();
        this.toastr.success('La tarea fue eliminada con exito', 'Tarea eliminada')
      },
      error: (e: HttpErrorResponse) => {
        this._toastMessage.messageError(e);
      }
    });
  }

  addTask() {
    this.router.navigate(['/task/new']);
  }

  editTask(id: number) {
    this.router.navigate(['/task/edit', id]);
  }

}
