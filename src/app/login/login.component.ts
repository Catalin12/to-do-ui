import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

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
		private formBuilder: FormBuilder
	) { }

	public handleClickLogin(): void {
		console.log(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value);
	}

	public get email(): any {
		return this.loginForm.get("email");
	}

	public get password(): any {
		return this.loginForm.get("password");
	}

}