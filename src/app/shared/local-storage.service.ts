import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class LocalStorageService {

	public addToken(token: string): void {
		localStorage.setItem("token", token);
	}

	public removeToken(): void {
		localStorage.removeItem("token");
	}

	public getToken(): string|null {
		return localStorage.getItem("token");
	}

	public isUserLoggedIn(): boolean {
		if (localStorage.getItem("token")) {
			return true;
		} else {
			return false;
		}
	}
}
