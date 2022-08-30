import { Component } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
	) { }

	public handleClickRegister(): void {
		this.registerDTO = {
			email: this.registerForm.get("email")?.value ?? "",
			password: this.registerForm.get("password")?.value ?? ""
		};
		this.authService.register(this.registerDTO).subscribe({
			next: (response) => {
				//TODO add toast with succesful response
				this.router.navigate(["/login"]);
			},
			error: (error) => {
				//TODO add toast with error
				console.log(error.message);
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
