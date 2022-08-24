import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

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
		private formBuilder: FormBuilder
	) { }

	public onSubmit(): void {
		console.warn(this.taskForm.value);
	}

	public ngOnInit(): void {
		this.taskForm.setValue({
			title: "",
			description: "",
			isCompleted: false
		});
	}

}
