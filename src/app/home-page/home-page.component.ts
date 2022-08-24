import { Component, OnInit } from "@angular/core";

@Component({
	selector: "home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {

	public isUserLoggedIn: boolean = true;

	public areTasksCompleted?: boolean;

	public constructor() { }

	public ngOnInit(): void {
		console.log("home page work!");
	}

	public getShowTasksInProgressValue(value: boolean): void {
		this.areTasksCompleted = !value;
	}
}
