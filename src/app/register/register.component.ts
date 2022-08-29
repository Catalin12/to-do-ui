import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

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
		private formBuilder: FormBuilder
	) { }

	public handleClickRegister(): void {
		console.log(this.registerForm.get("email")?.value, this.registerForm.get("password")?.value);
	}

	public get email(): any {
		return this.registerForm.get("email");
	}

	public get password(): any {
		return this.registerForm.get("password");
	}
}
