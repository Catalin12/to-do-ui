import { Injectable } from "@angular/core";
import { EventEmitter } from "events";

import { EventTypeEnum } from "./event-type.enum";
import { EventModel } from "./event.model";

@Injectable({
	providedIn: "root"
})
export class EventService {

	private eventEmitter = new EventEmitter();
	private events: { [key: number]: EventModel } = {};
	private nextSubscriptionId: number = 1;

	public subscribe(eventType: EventTypeEnum, callback: (...args: any[]) => void): number {
		const subscriptionId = this.nextSubscriptionId;
		this.nextSubscriptionId++;
		this.events[subscriptionId] = { name: eventType, handler: callback } as EventModel;
		this.eventEmitter.on(eventType, callback);

		return subscriptionId;
	}

	public emit(eventType: EventTypeEnum): void {
		this.eventEmitter.emit(eventType);
	}

	public unsubscribe(subscriptionId: number): void {
		if (this.events[subscriptionId]) {
			this.eventEmitter.off(this.events[subscriptionId].name, this.events[subscriptionId].handler);
			delete this.events[subscriptionId];
		}
	}
}
