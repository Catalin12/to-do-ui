import { Component } from "@angular/core";

@Component({
	selector: "home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent {

	public isUserLoggedIn: boolean = true;

	public isFilterActive: boolean = false;

	public handleListFilter(value: boolean): void {
		this.isFilterActive = value;
	}
}
