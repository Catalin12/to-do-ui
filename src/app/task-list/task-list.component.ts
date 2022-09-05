import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
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
		private eventService: EventService,
		private messsageService: MessageService
	) {
		this.handleEvents();
	}

	public ngOnInit(): void {
		this.prepareTasks();
	}

	private prepareTasks(): void {
		this.apiService.getAllTasks().subscribe({
			next: (tasks) => {
				this.taskDTOs = tasks.filter(task => !task.isDeleted);
				this.completedTaskDTOs = this.taskDTOs.filter(task => task.isCompleted);
				this.inProgressTaskDTOs = this.taskDTOs.filter(task => !task.isCompleted);
			},
			error: (error) => {
				this.messsageService.add({
					severity: "error",
					summary: "Errror!",
					detail: error.status + " " + error.statusText
				});
			}
		});
	}

	private handleEvents(): void {
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.ADD_TASK, () => {
			this.prepareTasks();
			this.dynamicDialogRef?.close();
		}));
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.EDIT_TASK, () => {
			this.prepareTasks();
		}));
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.DELETE_TASK, () => {
			this.prepareTasks();
		}));
		this.subscriptionIds.push(this.eventService.subscribe(EventTypeEnum.UPDATE_STATUS_TASK, () => {
			this.prepareTasks();
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

	public trackById(taskDto: any): number {
		return taskDto.id ?? 0;
	}

	public ngOnDestroy(): void {
		for (const subscriptionId of this.subscriptionIds) {
			this.eventService.unsubscribe(subscriptionId);
		}
	}
}
