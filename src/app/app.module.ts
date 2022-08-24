import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CardModule} from "primeng/card";
import { ToggleButtonModule} from "primeng/togglebutton";
import { ButtonModule } from "primeng/button";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HomePageComponent } from "./home-page/home-page.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskComponent } from "./task/task.component";
import { TaskListComponent } from "./task-list/task-list.component";

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
    TaskFormComponent,
    TaskComponent,
		TaskListComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
    ButtonModule,
		DialogModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
    CardModule,
		ToggleButtonModule,
		ButtonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
