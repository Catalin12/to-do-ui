import { Component, Input, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { ApiService } from "../shared/api.service";
import { FormTypeEnum } from "../shared/click-type.enum";

import { TaskDTO } from "../shared/TaskDTO";
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
	selector: "task-list",
	templateUrl: "./task-list.component.html",
	styleUrls: ["./task-list.component.css"],
	providers: [DialogService]
})
export class TaskListComponent implements OnInit {

	public taskList?: TaskDTO[];

	@Input()
	public isFilterActive: boolean = false;

	public constructor(
		private dialogService: DialogService,
		private apiService: ApiService
	) {}

	public ngOnInit(): void {
		this.apiService.getAllTasks().subscribe(
			(tasks) => this.taskList = tasks
		);
	}

	public handleTaskForm(): void {
		console.warn("handleTaskForm() was called.");
		this.dialogService.open(TaskFormComponent, {
			header: FormTypeEnum.ADD,
			height: "40%",
			width: "40%",
			data: {
				title: "",
				description: "",
				isCompleted: false,
				clickType: FormTypeEnum.ADD
			}
		});
	}

}
