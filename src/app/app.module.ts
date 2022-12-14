import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CardModule } from "primeng/card";
import { ToggleButtonModule } from "primeng/togglebutton";
import { MenubarModule } from "primeng/menubar";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskComponent } from "./task/task.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { JwtInterceptorService } from "./shared/jwt-interceptor.service";

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		TaskFormComponent,
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
		ButtonModule,
		DialogModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		CardModule,
		ToggleButtonModule,
		InputTextModule,
		InputTextareaModule,
		ButtonModule,
		MenubarModule,
		ToastModule,
		HttpClientModule,
		ConfirmDialogModule
	],
	providers: [
		MessageService,
		DialogService,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }