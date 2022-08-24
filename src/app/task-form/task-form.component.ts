import { Component } from "@angular/core";
import { FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: "task-form",
	templateUrl: "./task-form.component.html",
	styleUrls: ["./task-form.component.css"]
})
export class TaskFormComponent {

	public taskForm = this.formBuilder.group({
		title: ["", Validators.required],
		description: [""],
		isCompleted: false
	});
	public name = new FormControl("");
	public constructor(
		private formBuilder: FormBuilder
	) { }

	public onSubmit(): void {
		console.warn(this.taskForm.value);
	}

}
