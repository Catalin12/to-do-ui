import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";

@Component({
	selector: "nav-bar",
	templateUrl: "./nav-bar.component.html",
	styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent {

	public items: MenuItem[];

	@Output()
	public showTasksInProgressEvent = new EventEmitter<boolean>();

	public constructor(private router: Router) {
		this.items = [
			{
				label:"In progress tasks",
				icon:"pi pi-fw pi-sync",
				command: (): void => { this.handleShowTasksInProgress(); }
			},
			{
				label:"Completed tasks",
				icon:"pi pi-fw pi-check",
				command: (): void => { this.handleShowTasksCompleted(); }
			}
		];
	}

	public handleShowTasksInProgress(): void {
		this.showTasksInProgressEvent.emit(true);
	}

	public handleShowTasksCompleted(): void {
		this.showTasksInProgressEvent.emit(false);
	}

	public handleLogout(): void {
		//TODO when api authentication ready, also delete token form localstorage
		this.router.navigate(["login"]);
	}
}
