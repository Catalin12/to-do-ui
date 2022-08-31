import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { EventTypeEnum } from "../shared/event-type.enum";
import { EventService } from "../shared/event.service";

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
		private eventService: EventService
	) {}

	public handleFilterButtonClick(): void {
		this.onListFilter.emit(this.isFilterActive);
	}

	public handleLogoutButtonClick(): void {
		this.eventService.emit(EventTypeEnum.LOGOUT);
		this.router.navigate(["login"]);
	}
}
