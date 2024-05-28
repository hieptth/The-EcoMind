import { BehaviorSubject } from "rxjs";

export interface BaseStoreProps<T> {
  value: T;
}

export class BaseStore<T> {
  private store: BaseStoreProps<T> | undefined = undefined;

  private readonly observable: BehaviorSubject<T>;

  constructor(value: { initValue: T }) {
    this.store = {
      value: value.initValue,
    };
    this.observable = new BehaviorSubject(value.initValue);
  }
  public getObservable() {
    return this.observable;
  }

  public setStore(value: T) {
    this.store!.value = value;
    this.observable.next(value);
  }

  public updateStore(updatedValue: Partial<T>) {
    this.store!.value = {
      ...this.store!.value,
      ...updatedValue,
    };
    this.observable.next({
      ...this.store!.value,
      ...updatedValue,
    });
  }

  public getValue(): T {
    return this.store!.value as T;
  }
}
