import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { TaskDTO } from "./task.dto";

@Injectable({
	providedIn: "root"
})
export class ApiService {

	private apiURL: string = "http://localhost:3000/task";

	public constructor(private http: HttpClient) { }

	public getAllTasks(): Observable<TaskDTO[]> {
		const getAllTasksUrl = this.apiURL + "/all";
		return this.http.get<TaskDTO[]>(getAllTasksUrl);
	}

	public addTask(task: TaskDTO): Observable<TaskDTO> {
		const addTaskUrl = this.apiURL + "/new-task";
		return this.http.post(addTaskUrl, task);
	}

	public editTask(task: TaskDTO): Observable<TaskDTO> {
		const editTaskUrl = this.apiURL + "/edit-task/" + task.id;
		return this.http.put(editTaskUrl, task);
	}

	public changeTaskStatus(id: number): Observable<TaskDTO> {
		const changeTaskStatusUrl = this.apiURL + "/new-status/" + id;
		return this.http.patch(changeTaskStatusUrl, {id});
	}

	public deleteTask(id: number): Observable<TaskDTO> {
		const deleteTaskUrl = this.apiURL + "/delete/" + id;
		return this.http.patch(deleteTaskUrl, {id});
	}
}
