import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogConfig } from "primeng/dynamicdialog";

import { ApiService } from "../shared/api.service";
import { EventTypeEnum } from "../shared/event-type.enum";
import { EventService } from "../shared/event.service";
import { FormTypeEnum } from "../shared/form-type.enum";
import { TaskDTO } from "../shared/task.dto";

@Component({
	selector: "task-form",
	templateUrl: "./task-form.component.html",
	styleUrls: ["./task-form.component.css"],
})
export class TaskFormComponent implements OnInit {

	public taskForm = this.formBuilder.group({
		title: ["", Validators.required],
		description: [""],
		isCompleted: false
	});

	public constructor(
		private formBuilder: FormBuilder,
		private dialogConfig: DynamicDialogConfig,
		private apiService: ApiService,
		private eventService: EventService
	) { }

	public onSubmit(): void {
		const task: TaskDTO = {
			id: this.dialogConfig.data.id ?? null,
			title: this.taskForm.value.title ?? "",
			description: this.taskForm.value.description ?? "",
			isCompleted: this.taskForm.value.isCompleted ?? false,
			isDeleted: false,
			userId: this.dialogConfig.data.userId
		};
		switch (this.dialogConfig.data.clickType) {
			case FormTypeEnum.ADD: {
				this.addTask(task);
				break;
			}
			case FormTypeEnum.EDIT: {
				this.editTask(task);
				break;
			}
		}
	}

	public ngOnInit(): void {
		this.taskForm.setValue({
			title: this.dialogConfig.data.title,
			description: this.dialogConfig.data.description,
			isCompleted: this.dialogConfig.data.isCompleted
		});
	}

	private addTask(task: TaskDTO): void {
		this.apiService.addTask(task).subscribe({
			next: () => {
				this.eventService.emit(EventTypeEnum.ADD_TASK);
			}
		});
	}

	private editTask(task: TaskDTO): void {
		this.apiService.editTask(task).subscribe({
			next: () => {
				this.eventService.emit(EventTypeEnum.EDIT_TASK);
			}
		});
	}
}
