import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CardModule} from "primeng/card";
import { ToggleButtonModule} from "primeng/togglebutton";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { TaskComponent } from "./task/task.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		TaskComponent,
		TaskListComponent,
		LoginComponent,
		RegisterComponent,
		NotFoundComponent,
		NavBarComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		CardModule,
		ToggleButtonModule,
		ButtonModule,
		MenubarModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
