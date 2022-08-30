import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../shared/auth.service";
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
		private router: Router
	) { }

	public handleClickLogin(): void {
		this.loginDTO = {
			email: this.loginForm.get("email")?.value ?? "",
			password: this.loginForm.get("password")?.value ?? ""
		};
		this.authService.login(this.loginDTO).subscribe({
			next: (token) => {
				//TODO add toast with succesful response
				//TODO save token in local storage
				console.log(token);
				this.router.navigate(["/"]);
			},
			error: (error) => {
				//TODO add toast with error message
				console.log(error);
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