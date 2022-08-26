import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { ApiService } from "../shared/api.service";
import { FormTypeEnum } from "../shared/click-type.enum";

import { TaskDTO } from "../shared/TaskDTO";
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
		private apiService: ApiService
	) { }

	public handleClickStatus(): void {
		if(this.task.id) {
			let updatedStatus: TaskDTO = {};
			this.apiService.changeTaskStatus(this.task.id).subscribe(
				(response) => updatedStatus = response
			);
		}
	}

	public handleClickEdit(): void {
		this.handleTaskForm(FormTypeEnum.EDIT);
	}

	public handleClickDelete(): void {
		if(this.task.id) {
			let deletedTask: TaskDTO = {};
			this.apiService.deleteTask(this.task.id).subscribe(
				(response) => deletedTask = response
			);
		}
	}

	public handleTaskForm(clickTypeParam: FormTypeEnum): void {
		console.warn("handleTaskForm() was called.");
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
