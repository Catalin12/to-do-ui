import { Component } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";

import { TaskDTO } from "../shared/TaskDTO";
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
	selector: "task-list",
	templateUrl: "./task-list.component.html",
	styleUrls: ["./task-list.component.css"],
	providers: [DialogService]
})
export class TaskListComponent {

	public taskList: TaskDTO[];

	public constructor(
		private dialogService: DialogService
	) {
		this.taskList = [
			{
				id: 1,
				title: "Title",
				description: "Description",
				isCompleted: false,
				isDeleted: false,
				userId: 1
			},
			{
				id: 2,
				title: "Title 2",
				description: "Description 2",
				isCompleted: false,
				isDeleted: false,
				userId: 1
			}
		];
	}

	public handleTaskForm(): void {
		console.warn("handleTaskForm() was called.");
		this.dialogService.open(TaskFormComponent, {
			height: "40%",
			width: "20%",
			data: {
				title: "",
				description: "",
				isCompleted: false,
			}
		});
	}

}
