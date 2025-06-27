import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TaskModel } from "../models/task";
import { EndpointsPaths, getFullEndpoint } from "src/app/endpoints/endpoints";


@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getListTask(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(getFullEndpoint(EndpointsPaths.task));
  }

  createTask(task: TaskModel): Observable<void> {
    return this.http.post<void>(getFullEndpoint(EndpointsPaths.task), task);
  }

  getTask(id: string): Observable<TaskModel> {
    return this.http.get<TaskModel>(getFullEndpoint(EndpointsPaths.taskId, [id]));
  }

  updateTask(task: TaskModel, id: string): Observable<void> {
    return this.http.put<void>(getFullEndpoint(EndpointsPaths.taskId, [id]), task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(getFullEndpoint(EndpointsPaths.taskId, [id]));
  }
}
