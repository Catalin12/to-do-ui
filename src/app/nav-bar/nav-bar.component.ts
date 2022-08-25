import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "nav-bar",
	templateUrl: "./nav-bar.component.html",
	styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent {

	@Output()
	public onListFilter = new EventEmitter<boolean>();

	public isFilterActive: boolean = false;

	public constructor(private router: Router) {
	}

	public handleFilterButtonClick(): void {
		console.log(this.isFilterActive);
		this.onListFilter.emit(this.isFilterActive);
	}

	public handleLogoutButtonClick(): void {
		//TODO when api authentication ready, also delete token form localstorage
		this.router.navigate(["login"]);
	}
}
