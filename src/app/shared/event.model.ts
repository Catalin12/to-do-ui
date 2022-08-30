export interface EventModel {
	name: string;
	handler: (...args: any[]) => void;
}