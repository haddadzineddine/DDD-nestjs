import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "src/user/domain/events/user-created.event";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
    handle(event: UserCreatedEvent) {
        Logger.log(`User created event: ${event.id} and email: ${event.email}`, 'UserCreatedHandler');
    }
}