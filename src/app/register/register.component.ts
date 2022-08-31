import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

import { AuthService } from "../shared/auth.service";
import { RegisterDTO } from "../shared/register.dto";

@Component({
	selector: "register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.css"]
})
export class RegisterComponent {

	public registerDTO: RegisterDTO = {
		email: "",
		password: ""
	};

	public registerForm = this.formBuilder.group({
		email: new FormControl(this.registerDTO.email, [
			Validators.required,
			Validators.email
		]),
		password: new FormControl(this.registerDTO.password, [
			Validators.required,
			Validators.minLength(8)
		])
	});

	public constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private messageService: MessageService
	) { }

	public handleClickRegister(): void {
		this.registerDTO = {
			email: this.registerForm.get("email")?.value ?? "",
			password: this.registerForm.get("password")?.value ?? ""
		};
		this.authService.register(this.registerDTO).subscribe({
			next: (response) => {
				this.router.navigate(["/login"]);
				this.messageService.add({
					severity: "success",
					summary: "Success!",
					detail: "You created an account"
				});
			},
			error: (error) => {
				this.messageService.add({
					severity: "error",
					summary: "Error! Account could not be created",
					detail: error.status + " " + error.statusText
				});
			}
		});
	}

	public get email(): any {
		return this.registerForm.get("email");
	}

	public get password(): any {
		return this.registerForm.get("password");
	}
}
