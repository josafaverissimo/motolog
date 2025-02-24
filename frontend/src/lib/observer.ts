export interface Subscriber<TUpdateValue> {
  update: (value: TUpdateValue) => void;
}

export class Publisher<TUpdateValue> {
  constructor(private subscribers: Set<Subscriber<TUpdateValue>> = new Set()) { }

  subscribe(subscriber: Subscriber<TUpdateValue>) {
    this.subscribers.add(subscriber)
  }

  unsubscribe(subscriber: Subscriber<TUpdateValue>) {
    this.subscribers.delete(subscriber)
  }

  notify(message: TUpdateValue) {
    this.subscribers.forEach(subscriber => subscriber.update(message))
  }
}
