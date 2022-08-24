import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from "@angular/forms";

import { ButtonModule } from "primeng/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HomePageComponent } from "./home-page/home-page.component";
import { TaskFormComponent } from "./task-form/task-form.component";



@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		TaskFormComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ButtonModule,
		DialogModule,
		BrowserAnimationsModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
