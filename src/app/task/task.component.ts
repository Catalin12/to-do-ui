import { Component, OnInit } from "@angular/core";

import { TaskDTO } from "../shared/TaskDTO";

@Component({
	selector: "task",
	templateUrl: "./task.component.html",
	styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {

	public taskTest: TaskDTO;
	public showTaskDetails: boolean = false;

	public constructor() {
		this.taskTest = {
			id: 1,
			title: "Title",
			description: "Description",
			isCompleted: false,
			isDeleted: false,
			userId: 1
		};
	}

	public ngOnInit(): void {
		console.log("Init TaskComponent");
	}

	public handleClickStatus(): void {
		console.log(this.taskTest.isCompleted);
	}

	public handleClickEdit(): void {
		console.log("Clicked Edit Button");
	}

	public handleClickDelete(): void {
		console.log("Clicked Delete Button");
	}

}
