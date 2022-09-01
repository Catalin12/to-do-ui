import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
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
	styleUrls: ["./task.component.css"],
	providers: [ ConfirmationService ]
})
export class TaskComponent {

	@Input()
	public task: TaskDTO = {};

	@Output()
	public onChangeStatus = new EventEmitter<number>();

	@Output()
	public onDelete = new EventEmitter<number>();

	public areTaskDetailsShown: boolean = false;
	public isConfirmDeleteDialogShown: boolean = false;

	public constructor(
		private dialogService: DialogService,
		private apiService: ApiService,
		private eventService: EventService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) { }

	public handleClickStatus(): void {
		if (this.task.id) {
			let updatedTaskDTO: TaskDTO = {};
			this.apiService.changeTaskStatus(this.task.id).subscribe({
				next: (response) => {
					updatedTaskDTO = response;
					const messageDetail: string = updatedTaskDTO.isCompleted ? "done" : "to do";
					this.eventService.emit(EventTypeEnum.UPDATE_STATUS_TASK);
					this.messageService.add({
						severity: "success",
						summary: "Success!",
						detail: "Task with title: '" + response.title + "' was marked as " + messageDetail
					});
				},
				error: (error) => {
					this.messageService.add({
						severity: "error",
						summary: "Error! Task could not be updated",
						detail: error.status + " " + error.statusText
					});
				}
			});
		}
	}

	public handleClickEdit(): void {
		this.handleTaskForm(FormTypeEnum.EDIT);
	}

	public handleConfirmDeleteDialog(): void {
		this.confirmationService.confirm({
			message: "Do you want to delete this record?",
			header: "Delete confirmation",
			icon: "pi pi-info-circle",
			accept: () => {
				this.handleClickDelete();
			}
		});
	}

	public handleClickDelete(): void {
		if (this.task.id) {
			let deletedTaskDTO: TaskDTO = {};
			this.apiService.deleteTask(this.task.id).subscribe({
				next: (response) => {
					deletedTaskDTO = response;
					this.eventService.emit(EventTypeEnum.DELETE_TASK);
					this.messageService.add({
						severity: "success",
						summary: "Success! Task was deleted",
						detail: "Title: " + response.title
					});
				},
				error: (error) => {
					this.messageService.add({
						severity: "error",
						summary: "Error! Task could not be deleted",
						detail: error.status + " " + error.statusText
					});
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
				clickType: clickTypeParam
			}
		});
	}
}
