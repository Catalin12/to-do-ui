import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

import { AuthService } from "../shared/auth.service";
import { EventTypeEnum } from "../shared/event-type.enum";
import { EventService } from "../shared/event.service";
import { LocalStorageService } from "../shared/local-storage.service";
import { LoginDTO } from "../shared/login.dto";

@Component({
	selector: "login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent {

	public loginDTO: LoginDTO = {
		email: "",
		password: ""
	};

	public loginForm = this.formBuilder.group({
		email: new FormControl(this.loginDTO.email, [
			Validators.required,
			Validators.email
		]),
		password: new FormControl(this.loginDTO.password, [
			Validators.required,
			Validators.minLength(8)
		])
	});

	public constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private localStorageService: LocalStorageService,
		private messageService: MessageService,
		private eventService: EventService
	) { }

	public handleClickLogin(): void {
		this.loginDTO = {
			email: this.loginForm.get("email")?.value ?? "",
			password: this.loginForm.get("password")?.value ?? ""
		};
		this.authService.login(this.loginDTO).subscribe({
			next: (token) => {
				this.localStorageService.addToken(token);
				this.router.navigate(["/"]);
				this.eventService.emit(EventTypeEnum.LOGIN);
				this.messageService.add({
					severity: "success",
					summary: "Success! You are logged in",
					detail: "You are logged in"
				});
			},
			error: (error) => {
				this.messageService.add({
					severity: "error",
					summary: "Error! Could not sign you in",
					detail: error.status + " " + error.statusText
				});
			}
		});
	}

	public get email(): any {
		return this.loginForm.get("email");
	}

	public get password(): any {
		return this.loginForm.get("password");
	}
}