import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LoginDTO } from "./login.dto";
import { RegisterDTO } from "./register.dto";
import { UserDTO } from "./user.dto";

@Injectable({
	providedIn: "root"
})
export class AuthService {

	private authURL: string = "http://localhost:3000/auth";

	public constructor(private http: HttpClient) { }

	public login(loginDTO: LoginDTO): Observable<string> {
		const loginURL = this.authURL + "/login";
		return this.http.post(loginURL, loginDTO, { responseType: "text" });
	}

	public register(registerDTO: RegisterDTO): Observable<UserDTO> {
		const registerURL = this.authURL + "/register";
		return this.http.post<UserDTO>(registerURL, registerDTO);
	}
}
