import { Component, Input, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";

import { ApiService } from "../shared/api.service";
import { FormTypeEnum } from "../shared/form-type.enum";
import { TaskDTO } from "../shared/task.dto";
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
	selector: "task-list",
	templateUrl: "./task-list.component.html",
	styleUrls: ["./task-list.component.css"],
	providers: [DialogService]
})
export class TaskListComponent implements OnInit {

	public taskDTOs?: TaskDTO[];
	public completedTaskDTOs?: TaskDTO[];
	public inProgressTaskDTOs?: TaskDTO[];

	@Input()
	public isFilterActive: boolean = false;

	public constructor(
		private dialogService: DialogService,
		private apiService: ApiService
	) {}

	public ngOnInit(): void {
		this.apiService.getAllTasks().subscribe(
			(tasks) => {
				this.taskDTOs = tasks;
				this.completedTaskDTOs = this.taskDTOs.filter(task => task.isCompleted);
				this.inProgressTaskDTOs = this.taskDTOs.filter(task => !task.isCompleted);
			}
		);
	}

	public handleTaskForm(): void {
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
