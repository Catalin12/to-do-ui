import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "nav-bar",
	templateUrl: "./nav-bar.component.html",
	styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent {

	@Output()
	public activeFilterEvent = new EventEmitter<boolean>();

	public isFilterActive: boolean = false;

	public constructor(private router: Router) {
	}

	public handleFilterTasks(): void {
		console.log(this.isFilterActive);
		this.activeFilterEvent.emit(this.isFilterActive);
	}

	public handleLogout(): void {
		//TODO when api authentication ready, also delete token form localstorage
		this.router.navigate(["login"]);
	}
}
