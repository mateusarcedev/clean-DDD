import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

interface NotificationProps {
  recipientId: UniqueEntityID
  title: string
  content: string
  readAt?: Date
  createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
  recipientId() {
    return this.props.recipientId
  }

  title() {
    return this.props.title
  }

  content() {
    return this.props.content
  }

  readAt() {
    return this.props.readAt
  }

  createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityID) {
    const notification = new Notification({
      ...props,
      createdAt: props.createdAt ?? new Date()
    },
      id
    )

    return notification
  }
}