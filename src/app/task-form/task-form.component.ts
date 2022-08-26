import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { ApiService } from "../shared/api.service";
import { FormTypeEnum } from "../shared/click-type.enum";
import { TaskDTO } from "../shared/TaskDTO";

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
		private apiService: ApiService
	) { }

	public onSubmit(): void {
		const task: TaskDTO = {
			id: this.dialogConfig.data.id ?? null,
			title: this.taskForm.value.title ?? "",
			description: this.taskForm.value.description ?? "",
			isCompleted: this.taskForm.value.isCompleted ?? false,
			isDeleted: false,
			//TODO userId: this.dialogConfig.data.userId
		};
		switch(this.dialogConfig.data.clickType){
			case FormTypeEnum.ADD: {
				this.apiService.addTask(task).subscribe();
				break;
			}
			case FormTypeEnum.EDIT: {
				this.apiService.editTask(task).subscribe();
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
}
