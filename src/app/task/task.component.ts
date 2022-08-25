import { Component, Input, ViewEncapsulation } from "@angular/core";

import { TaskDTO } from "../shared/TaskDTO";

@Component({
	selector: "task",
	templateUrl: "./task.component.html",
	styleUrls: ["./task.component.css"],
	encapsulation: ViewEncapsulation.None
})
export class TaskComponent {

	@Input()
	public task: TaskDTO = {};

	public areTaskDetailsShown: boolean = false;

	public constructor() {
	}

	public handleClickStatus(): void {
		console.log(this.task.isCompleted, this.task.id);
	}

	public handleClickEdit(): void {
		console.log("Clicked Edit Button", this.task.id);
	}

	public handleClickDelete(): void {
		console.log("Clicked Delete Button", this.task.id);
	}

}
