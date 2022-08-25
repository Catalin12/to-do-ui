import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { MessageService } from "primeng/api";

@Component({
	selector: "task-form",
	templateUrl: "./task-form.component.html",
	styleUrls: ["./task-form.component.css"]
})
export class TaskFormComponent implements OnInit {

	public taskForm = this.formBuilder.group({
		title: ["", Validators.required],
		description: [""],
		isCompleted: false
	});

	public constructor(
		private formBuilder: FormBuilder,
		private dialogService: DynamicDialogConfig,
		private messageService: MessageService
	) { }

	public onSubmit(): void {
		this.messageService.add({
			severity: "success",
			summary: "Type here a message",
			detail: "Type here some details"
		});
		console.warn(`debug clickType ${this.dialogService.data.clickType}, task id ${this.dialogService.data.id}`);
	}

	public ngOnInit(): void {
		this.taskForm.setValue({
			title: "",
			description: "",
			isCompleted: false
		});
	}

}
