import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { TaskDTO } from "./task.dto";
import { LocalStorageService } from "./local-storage.service";
import { EventService } from "./event.service";
import { EventTypeEnum } from "./event-type.enum";

@Injectable({
	providedIn: "root"
})
export class ApiService {

	private apiURL: string = "http://localhost:3000/task";
	private token?: string;
	private header?: object;
	public subscriptionIds: number[] = [];

	public constructor(
		private http: HttpClient,
		private localStorageService: LocalStorageService,
		private eventService: EventService
	) {
		this.handleEvents();
	}

	private handleEvents(): void {
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.LOGIN, () => {
			this.token = this.localStorageService.getToken()??"";
			this.header = {
				headers: { "Authorization": "Bearer " + this.token, "Content-Type": "application/json" }
			};
		}));
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.LOGOUT, () => {
			this.localStorageService.removeToken();
			this.header = {
				headers: { "Content-Type": "application/json" }
			};
		}));
	}

	public getAllTasks(): Observable<TaskDTO[]> {
		const getAllTasksUrl = this.apiURL + "/all";
		return this.http.get<TaskDTO[]>(getAllTasksUrl, this.header);
	}

	public addTask(task: TaskDTO): Observable<TaskDTO> {
		const addTaskUrl = this.apiURL + "/new-task";
		return this.http.post(addTaskUrl, task, this.header);
	}

	public editTask(task: TaskDTO): Observable<TaskDTO> {
		const editTaskUrl = this.apiURL + "/edit-task/" + task.id;
		return this.http.put(editTaskUrl, task, this.header);
	}

	public changeTaskStatus(id: number): Observable<TaskDTO> {
		const changeTaskStatusUrl = this.apiURL + "/new-status/" + id;
		return this.http.patch(changeTaskStatusUrl, {id}, this.header);
	}

	public deleteTask(id: number): Observable<TaskDTO> {
		const deleteTaskUrl = this.apiURL + "/delete/" + id;
		return this.http.patch(deleteTaskUrl, {id}, this.header);
	}
}
