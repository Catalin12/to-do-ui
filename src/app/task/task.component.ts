import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";

import { ApiService } from "../shared/api.service";
import { EventTypeEnum } from "../shared/event-type.enum";
import { EventService } from "../shared/event.service";
import { FormTypeEnum } from "../shared/form-type.enum";
import { TaskDTO } from "../shared/task.dto";
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
	selector: "task",
	templateUrl: "./task.component.html",
	styleUrls: ["./task.component.css"]
})
export class TaskComponent {

	@Input()
	public task: TaskDTO = {};

	@Output()
	public onChangeStatus = new EventEmitter<number>();

	@Output()
	public onDelete = new EventEmitter<number>();

	public areTaskDetailsShown: boolean = false;

	public constructor(
		private dialogService: DialogService,
		private apiService: ApiService,
		private eventService: EventService
	) { }

	public handleClickStatus(): void {
		if (this.task.id) {
			let updatedTaskDTO: TaskDTO = {};
			this.apiService.changeTaskStatus(this.task.id).subscribe({
				next: (response) => {
					updatedTaskDTO = response;
					this.eventService.emit(EventTypeEnum.UPDATE_STATUS_TASK);
				}
			});
		}
	}

	public handleClickEdit(): void {
		this.handleTaskForm(FormTypeEnum.EDIT);
	}

	public handleClickDelete(): void {
		if (this.task.id) {
			let deletedTaskDTO: TaskDTO = {};
			this.apiService.deleteTask(this.task.id).subscribe({
				next: (response) => {
					deletedTaskDTO = response;
					this.eventService.emit(EventTypeEnum.DELETE_TASK);
				}
			});
		}
	}

	public handleTaskForm(clickTypeParam: FormTypeEnum): void {
		this.dialogService.open(TaskFormComponent, {
			header: "Edit-Task",
			height: "40%",
			width: "40%",
			data: {
				id: this.task.id,
				title: this.task.title,
				description: this.task.description,
				isCompleted: this.task.isCompleted,
				userId: this.task.userId,
				clickType: clickTypeParam
			}
		});
	}

}
