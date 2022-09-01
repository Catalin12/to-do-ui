import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

import { LocalStorageService } from "../shared/local-storage.service";

@Component({
	selector: "nav-bar",
	templateUrl: "./nav-bar.component.html",
	styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent {

	@Output()
	public onListFilter = new EventEmitter<boolean>();

	public isFilterActive: boolean = false;

	public constructor(
		private router: Router,
		private localStorageService: LocalStorageService
	) {}

	public handleFilterButtonClick(): void {
		this.onListFilter.emit(this.isFilterActive);
	}

	public handleLogoutButtonClick(): void {
		this.localStorageService.removeToken();
		this.router.navigate(["login"]);
	}
}
