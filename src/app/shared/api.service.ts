import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { TaskDTO } from "./task.dto";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class ApiService {

	private apiURL: string = "http://localhost:3000/task";

	public constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService
	) { }

	public getAllTasks(): Observable<TaskDTO[]> {
		const getAllTasksUrl = this.apiURL + "/all";
		const token = this.localStorageService.getToken();
		return this.http.get<TaskDTO[]>(getAllTasksUrl, {
			headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
		});
	}

	public addTask(task: TaskDTO): Observable<TaskDTO> {
		const addTaskUrl = this.apiURL + "/new-task";
		const token = this.localStorageService.getToken();
		return this.http.post(addTaskUrl, task, {
			headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
		});
	}

	public editTask(task: TaskDTO): Observable<TaskDTO> {
		const editTaskUrl = this.apiURL + "/edit-task/" + task.id;
		const token = this.localStorageService.getToken();
		return this.http.put(editTaskUrl, task, {
			headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
		});
	}

	public changeTaskStatus(id: number): Observable<TaskDTO> {
		const changeTaskStatusUrl = this.apiURL + "/new-status/" + id;
		const token = this.localStorageService.getToken();
		return this.http.patch(changeTaskStatusUrl, {id}, {
			headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
		});
	}

	public deleteTask(id: number): Observable<TaskDTO> {
		const deleteTaskUrl = this.apiURL + "/delete/" + id;
		const token = this.localStorageService.getToken();
		return this.http.patch(deleteTaskUrl, {id}, {
			headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
		});
	}
}
