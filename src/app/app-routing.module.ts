import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from "./home-page/home-page.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
	{
		path: "",
		component: HomePageComponent
	},
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "register",
		component: RegisterComponent
	},
	{
		path: "**",
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
