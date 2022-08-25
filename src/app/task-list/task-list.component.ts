import { Component, Input, OnInit } from "@angular/core";

import { TaskDTO } from "../shared/TaskDTO";

@Component({
	selector: "task-list",
	templateUrl: "./task-list.component.html",
	styleUrls: ["./task-list.component.css"]
})
export class TaskListComponent implements OnInit {

	public taskList: TaskDTO[];

	@Input()
	public isFilterActive: boolean = false;

	public constructor() {
		this.taskList = [
			{
				id: 1,
				title: "Title",
				description: "Description",
				isCompleted: false,
				isDeleted: false,
				userId: 1
			},
			{
				id: 2,
				title: "Title 2",
				description: "Description 2",
				isCompleted: false,
				isDeleted: false,
				userId: 1
			}
		];
	}

	public ngOnInit(): void {
	}

}
