import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CardModule} from "primeng/card";
import { ToggleButtonModule} from "primeng/togglebutton";
import { ButtonModule } from "primeng/button";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { TaskComponent } from "./task/task.component";

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		TaskComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		CardModule,
		ToggleButtonModule,
		ButtonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
