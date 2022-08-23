import { Component, OnInit } from "@angular/core";

@Component({
	selector: "home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {

	public constructor() { }

	public ngOnInit(): void {
		console.log("home page work!");
	}

}
