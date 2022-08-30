import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

import { ApiService } from "../shared/api.service";
import { EventTypeEnum } from "../shared/event-type.enum";
import { EventService } from "../shared/event.service";
import { FormTypeEnum } from "../shared/form-type.enum";
import { TaskDTO } from "../shared/task.dto";
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
	selector: "task-list",
	templateUrl: "./task-list.component.html",
	styleUrls: ["./task-list.component.css"],
	providers: [DialogService]
})
export class TaskListComponent implements OnInit, OnDestroy {

	public taskDTOs?: TaskDTO[];
	public completedTaskDTOs?: TaskDTO[];
	public inProgressTaskDTOs?: TaskDTO[];
	public subscriptionIds: number[] = [];
	public dynamicDialogRef?: DynamicDialogRef;

	@Input()
	public isFilterActive: boolean = false;

	public constructor(
		private dialogService: DialogService,
		private apiService: ApiService,
		private eventService: EventService
	) {}

	public ngOnInit(): void {
		this.getTasks();
		this.handleEvents();
	}

	public getTasks(): void {
		this.apiService.getAllTasks().subscribe(
			(tasks) => {
				this.taskDTOs = tasks;
				this.completedTaskDTOs = this.taskDTOs.filter(task => task.isCompleted);
				this.inProgressTaskDTOs = this.taskDTOs.filter(task => !task.isCompleted);
			}
		);
	}

	public handleEvents(): void {
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.ADD_TASK, () => {
			this.getTasks();
			this.dynamicDialogRef?.close();
		}));
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.EDIT_TASK, () => {
			this.getTasks();
		}));
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.DELETE_TASK, () => {
			this.getTasks();
		}));
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.UPDATE_STATUS_TASK, () => {
			this.getTasks();
		}));
	}

	public handleTaskForm(): void {
		this.dynamicDialogRef = this.dialogService.open(TaskFormComponent, {
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

	public ngOnDestroy(): void {
		for (const subscriptionId of this.subscriptionIds) {
			this.eventService.unsubscribe(subscriptionId);
		}
	}
}
