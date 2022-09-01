import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
	providedIn: "root"
})
export class JwtInterceptorService implements HttpInterceptor {

	public constructor(
		private localStorageService: LocalStorageService
	) { }

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.localStorageService.getToken();
		if (token) {
			request = request.clone({
				setHeaders: { "Authorization": "Bearer " + token, "Content-Type": "application/json" }
			});
		}
		return next.handle(request);
	}
}