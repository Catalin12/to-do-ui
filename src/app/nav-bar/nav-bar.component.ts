import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormTypeEnum } from "../shared/form-type.enum";

import { LocalStorageService } from "../shared/local-storage.service";
import { TaskFormComponent } from "../task-form/task-form.component";

@Component({
	selector: "nav-bar",
	templateUrl: "./nav-bar.component.html",
	styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent {

	@Output()
	public onListFilter = new EventEmitter<boolean>();

	public isFilterActive: boolean = false;
	public dynamicDialogRef?: DynamicDialogRef;

	public constructor(
		private router: Router,
		private localStorageService: LocalStorageService,
		private dialogService: DialogService
	) { }

	public handleFilterButtonClick(): void {
		this.onListFilter.emit(this.isFilterActive);
	}

	public handleLogoutButtonClick(): void {
		this.localStorageService.removeToken();
		this.router.navigate(["login"]);
	}

	public handleTaskForm(): void {
		this.dynamicDialogRef = this.dialogService.open(TaskFormComponent, {
			header: FormTypeEnum.ADD,
			height: "40%",
			width: "40%",
			data: {
				title: "",
				description: "",
				isCompleted: false,
				clickType: FormTypeEnum.ADD
			}
		});
	}
}
