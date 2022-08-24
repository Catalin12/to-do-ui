export interface TaskDTO {
	id: number;
	title: string;
	description: string;
	isCompleted: boolean;
	isDeleted: boolean;
	userId: number;
}