import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "../shared/local-storage.service";

@Component({
	selector: "home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {

	public isUserLoggedIn?: boolean;

	public isFilterActive: boolean = false;

	public constructor(
		private localStorageService: LocalStorageService
	) {}

	public ngOnInit(): void {
		this.isUserLoggedIn = this.localStorageService.isUserLoggedIn();
	}

	public handleListFilter(value: boolean): void {
		this.isFilterActive = value;
	}
}
